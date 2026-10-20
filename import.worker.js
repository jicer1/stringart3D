import {parseOBJ,parseGLB,parseSTL,normalizeMesh} from './geometry.js?v=1.0.13';
import {MeshoptSimplifier} from './vendor/meshopt_simplifier.js?v=1.0.13';

const TARGET=80000;
const report=(progress,message)=>postMessage({type:'progress',progress,message});

// Exact welding joins STL's per-face vertices without rounding or reshaping them.
function weld(model){
  const positions=[],indices=[],known=new Map(),remap=new Int32Array(model.positions.length/3).fill(-1);
  for(const id of model.indices){
    if(remap[id]<0){
      const p=model.positions.subarray(id*3,id*3+3),key=`${p[0]},${p[1]},${p[2]}`;
      let mapped=known.get(key);
      if(mapped===undefined){mapped=positions.length/3;known.set(key,mapped);positions.push(...p);}
      remap[id]=mapped;
    }
    indices.push(remap[id]);
  }
  const triangles=[];
  for(let i=0;i<indices.length;i+=3){const [a,b,c]=indices.slice(i,i+3);if(a!==b&&b!==c&&c!==a)triangles.push(a,b,c);}
  return {...model,positions:new Float32Array(positions),indices:new Uint32Array(triangles)};
}

function compact(model,indices){
  const positions=[],remap=new Map(),out=new Uint32Array(indices.length);
  for(let i=0;i<indices.length;i++){
    const old=indices[i];let id=remap.get(old);
    if(id===undefined){id=positions.length/3;remap.set(old,id);positions.push(...model.positions.subarray(old*3,old*3+3));}
    out[i]=id;
  }
  return {...model,positions:new Float32Array(positions),indices:out};
}

function irregularVertices(indices,vertexCount){
  const edges=new Map();
  for(let i=0;i<indices.length;i+=3)for(let j=0;j<3;j++){
    const a=indices[i+j],b=indices[i+(j+1)%3],key=Math.min(a,b)*vertexCount+Math.max(a,b);
    edges.set(key,(edges.get(key)||0)+1);
  }
  const vertices=new Set();
  for(const [key,count] of edges)if(count!==2){vertices.add(Math.floor(key/vertexCount));vertices.add(key%vertexCount);}
  return vertices;
}

export async function prepareVolume(buffer,name,extension){
  report(8,'Lecture du volume…');
  const parsers={obj:()=>parseOBJ(new TextDecoder().decode(buffer),name,{raw:true}),glb:()=>parseGLB(buffer,name,{raw:true}),stl:()=>parseSTL(buffer,name,{raw:true})};
  if(!parsers[extension])throw Error('Choisissez un fichier STL, OBJ ou GLB.');
  let model=parsers[extension]();
  const originalTriangles=model.indices.length/3;
  report(25,'Assemblage des sommets du volume…');
  model=weld(model);
  if(model.indices.length<12)throw Error('Le fichier ne contient pas assez de triangles utilisables.');
  let error=0;
  if(model.indices.length/3>TARGET){
    report(40,'Allègement du maillage, en conservant sa forme…');
    if(!MeshoptSimplifier.supported)throw Error('Ce navigateur ne permet pas l’allègement automatique (WebAssembly requis).');
    await MeshoptSimplifier.ready;
    let reduced;
    const vertexCount=model.positions.length/3,closed=irregularVertices(model.indices,vertexCount).size===0,locks=new Uint8Array(vertexCount);
    // Protect any narrow junction where a collapse would make a closed surface singular.
    for(let attempt=0;attempt<6;attempt++){
      for(const tolerance of [.002,.01,.03]){
        [reduced,error]=MeshoptSimplifier.simplifyWithAttributes(model.indices,model.positions,3,new Float32Array(0),0,[],locks,TARGET*3,tolerance,['LockBorder']);
        if(reduced.length<=TARGET*3)break;
      }
      const irregular=closed?irregularVertices(reduced,vertexCount):new Set();
      if(!irregular.size)break;
      if(attempt===5)throw Error('L’allègement ne peut pas conserver un volume fermé. Essayez un export moins détaillé.');
      for(let i=0;i<model.indices.length;i+=3){const triangle=model.indices.subarray(i,i+3);if(triangle.some(id=>irregular.has(id)))for(const id of triangle)locks[id]=1;}
    }
    if(reduced.length>300000)throw Error('Ce maillage reste trop complexe après allègement. Exportez un volume fermé plus simple (100 000 triangles maximum).');
    model=compact(model,reduced);
  }else model=compact(model,model.indices);
  report(90,'Centrage et préparation pour le tissage…');
  normalizeMesh(model);
  model.importInfo={originalTriangles,triangles:model.indices.length/3,simplified:model.indices.length/3<originalTriangles,error,orientation:extension==='stl'?'Z vers Y':'Y'};
  return model;
}

self.onmessage=async e=>{
  try{
    const model=await prepareVolume(e.data.buffer,e.data.name,e.data.extension);
    postMessage({type:'complete',model},[model.positions.buffer,model.indices.buffer,model.normals.buffer]);
  }catch(error){postMessage({type:'error',message:error.message||'L’import du volume a échoué.'});}
};

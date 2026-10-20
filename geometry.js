export const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export const distance=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1],a[2]-b[2]);
export function decode64(text,Type){if(typeof text!=='string'||text.length>28000000)throw Error('Données binaires trop grandes ou absentes.');const raw=atob(text),bytes=new Uint8Array(raw.length);for(let i=0;i<raw.length;i++)bytes[i]=raw.charCodeAt(i);if(bytes.length%Type.BYTES_PER_ELEMENT)throw Error('Données binaires incomplètes.');return new Type(bytes.buffer);}
export function encode64(array){const bytes=new Uint8Array(array.buffer,array.byteOffset,array.byteLength);let s='';for(let i=0;i<bytes.length;i+=16384)s+=String.fromCharCode(...bytes.subarray(i,i+16384));return btoa(s);}
export function normalsFor(positions,indices){const result=new Float32Array(positions.length);for(let i=0;i<indices.length;i+=3){const a=indices[i]*3,b=indices[i+1]*3,c=indices[i+2]*3,ux=positions[b]-positions[a],uy=positions[b+1]-positions[a+1],uz=positions[b+2]-positions[a+2],vx=positions[c]-positions[a],vy=positions[c+1]-positions[a+1],vz=positions[c+2]-positions[a+2],nx=uy*vz-uz*vy,ny=uz*vx-ux*vz,nz=ux*vy-uy*vx;for(const k of [a,b,c]){result[k]+=nx;result[k+1]+=ny;result[k+2]+=nz;}}for(let i=0;i<result.length;i+=3){const n=Math.hypot(result[i],result[i+1],result[i+2])||1;result[i]/=n;result[i+1]/=n;result[i+2]/=n;}return result;}
export function validateMesh(model,limit=100000){const p=model.positions,t=model.indices;if(!p||!t||p.length<12||p.length%3||t.length<12||t.length%3||p.length>limit*3||t.length>limit*3)throw Error(`Maillage attendu : de 4 à ${limit.toLocaleString('fr-FR')} sommets, au plus ${limit.toLocaleString('fr-FR')} triangles.`);for(const v of p)if(!Number.isFinite(v)||Math.abs(v)>1e9)throw Error('Le modèle contient une coordonnée incorrecte.');for(const id of t)if(!Number.isInteger(id)||id<0||id>=p.length/3)throw Error('Un triangle pointe vers un sommet absent.');return model;}
export function normalizeMesh(model){validateMesh(model);const p=model.positions,lo=[Infinity,Infinity,Infinity],hi=[-Infinity,-Infinity,-Infinity];for(let i=0;i<p.length;i++) {const a=i%3;lo[a]=Math.min(lo[a],p[i]);hi[a]=Math.max(hi[a],p[i]);}const d=hi.map((v,i)=>v-lo[i]);if(d.some(v=>v<1e-8))throw Error('Le modèle doit avoir un volume dans les trois directions.');const scale=Math.min(2.15/d[0],2/d[1],1.58/d[2]);for(let i=0;i<p.length;i++)p[i]=(p[i]-(lo[i%3]+hi[i%3])/2)*scale;model.normals=normalsFor(p,model.indices);return model;}
export function unpackModel(source){const demo=source.encoding!=='f32',positions=demo?Float32Array.from(decode64(source.positions,Int16Array),v=>v/10000):decode64(source.positions,Float32Array),normals=demo?Float32Array.from(decode64(source.normals,Int8Array),v=>v/127):decode64(source.normals,Float32Array),indices=decode64(source.indices,demo?Uint16Array:Uint32Array);const model=validateMesh({...source,positions,normals,indices});if(normals.length!==positions.length||Array.from(normals).some(v=>!Number.isFinite(v)))throw Error('Normales du modèle incorrectes.');for(let i=0;i<positions.length;i++)if(Math.abs(positions[i])>[1.10,1.02,.82][i%3])throw Error('Le volume dépasse la structure extérieure.');return model;}
export function packModel(model){return {encoding:'f32',name:model.name,attribution:model.attribution||'',source:model.source||'',positions:encode64(new Float32Array(model.positions)),normals:encode64(new Float32Array(model.normals)),indices:encode64(new Uint32Array(model.indices))};}
export function unpackMarks(source,passages){const result={};for(const style of ['inside','surface']){const item=source?.[style];if(!item)throw Error('Coloration du fil absente.');const offsets=decode64(item.offsets,Uint32Array),intervals=decode64(item.intervals,Uint16Array);if(offsets.length!==passages+1||offsets[0]!==0||offsets.at(-1)!==intervals.length)throw Error('Coloration incompatible avec le parcours.');for(let i=0;i<passages;i++){let previous=0;if(offsets[i+1]<offsets[i]||(offsets[i+1]-offsets[i])%2)throw Error('Découpage de couleur incorrect.');for(let k=offsets[i];k<offsets[i+1];k+=2){if(intervals[k]<previous||intervals[k+1]<=intervals[k])throw Error('Intervalles de couleur incorrects.');previous=intervals[k+1];}}result[style]={offsets,intervals};}return result;}
export function validateStudy(study){if(!Array.isArray(study.pins)||study.pins.length<8||study.pins.length>700)throw Error('Nombre de clous incorrect.');for(const p of study.pins)if(!Array.isArray(p)||p.length!==3||p.some(v=>!Number.isFinite(v)||Math.abs(v)>2))throw Error('Coordonnées de clous incorrectes.');if(!Array.isArray(study.variants)||!study.variants.length||study.variants.length>4||!Number.isInteger(study.frames)||study.frames<3||study.frames>9||!Number.isInteger(study.perFrame)||study.perFrame<24||study.perFrame>56||study.perFrame%4)throw Error('Structure de projet incorrecte.');if(!Number.isFinite(study.extent)||study.extent<1||study.extent>3||!Number.isInteger(study.size)||study.size<32||study.size>256)throw Error('Réglages de calcul incorrects.');for(const v of study.variants){if(!Number.isInteger(v.pinCount)||v.pinCount<8||v.pinCount>study.pins.length||!Array.isArray(v.route)||v.route.length<2||v.route.length>10001||!Number.isFinite(v.alpha)||v.alpha<=0||v.alpha>.2)throw Error('Parcours de fil incorrect.');for(let i=0;i<v.route.length;i++)if(!Number.isInteger(v.route[i])||v.route[i]<0||v.route[i]>=v.pinCount||(i&&v.route[i]===v.route[i-1]))throw Error('Le parcours contient un clou incorrect ou un passage nul.');v.marks=unpackMarks(v.coloration,v.route.length-1);}return study;}
export function pieces(variant,style,index){if(style==='mono')return [[0,1,1]];const marks=variant.marks?.[style];if(!marks)return [[0,1,0]];const result=[];let cursor=0;for(let k=marks.offsets[index];k<marks.offsets[index+1];k+=2){const a=marks.intervals[k]/65535,b=marks.intervals[k+1]/65535;if(a>cursor)result.push([cursor,a,0]);result.push([a,b,1]);cursor=b;}if(cursor<1)result.push([cursor,1,0]);return result;}
// World-space circular sections. The colored intervals swell inside their own
// boundaries, so consecutive veil/portrait sections meet at the same radius.
export function threadTubeGeometry(study,variant,style,sides=8){
  const positions=[],normals=[],ink=[],swelling=[],indices=[],ends=[0];
  const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
  const unit=a=>{const n=Math.hypot(...a);return a.map(v=>v/n);};
  for(let i=0;i<variant.route.length-1;i++){
    const a=study.pins[variant.route[i]],b=study.pins[variant.route[i+1]],length=distance(a,b);
    if(length<1e-12){ends.push(indices.length);continue;}
    const d=unit(b.map((v,k)=>v-a[k]));
    const u=unit(cross(d,Math.abs(d[1])<.9?[0,1,0]:[1,0,0])),v=cross(d,u),parts=pieces(variant,style,i);
    for(let j=0;j<parts.length;j++){
      const [from,to,color]=parts[j],ramp=(to-from)*.20;
      const rings=color&&style!=='mono'?[[from,0],[from+ramp,1],[to-ramp,1],[to,0]]:[[from,0],[to,0]];
      let last;
      for(const [t,factor] of rings){
        const start=positions.length/3;
        for(let k=0;k<sides;k++){
          const angle=k*Math.PI*2/sides;positions.push(...a.map((x,n)=>x+(b[n]-x)*t));
          normals.push(...u.map((x,n)=>x*Math.cos(angle)+v[n]*Math.sin(angle)));ink.push(color);swelling.push(factor);
        }
        if(last!==undefined)for(let k=0;k<sides;k++){const next=(k+1)%sides;indices.push(last+k,last+next,start+next,last+k,start+next,start+k);}
        if(j===0&&t===from){
          const center=positions.length/3;positions.push(...a);normals.push(...d.map(x=>-x));ink.push(color);swelling.push(0);
          for(let k=0;k<sides;k++)indices.push(center,start+(k+1)%sides,start+k);
        }
        if(j===parts.length-1&&t===to){
          const center=positions.length/3;positions.push(...b);normals.push(...d);ink.push(color);swelling.push(0);
          for(let k=0;k<sides;k++)indices.push(center,start+k,start+(k+1)%sides);
        }
        last=start;
      }
    }
    ends.push(indices.length);
  }
  return {positions:new Float32Array(positions),normals:new Float32Array(normals),ink:new Float32Array(ink),swelling:new Float32Array(swelling),indices:new Uint32Array(indices),ends};
}
export function framePins(frames,perFrame,rails){const pins=[],labels=[],perSide=perFrame/4;for(let f=0;f<frames;f++){const z=-.98+1.96*f/(frames-1);for(let side=0;side<4;side++)for(let k=0;k<perSide;k++){const t=(k+f/frames)/perSide;const [x,y]=[[-1.25+2.5*t,-1.18],[1.25,-1.18+2.36*t],[1.25-2.5*t,1.18],[-1.25,1.18-2.36*t]][side];pins.push([x,y,z]);labels.push(`cadre ${String.fromCharCode(65+f)} · ${String(side*perSide+k+1).padStart(2,'0')}`);}}if(rails)for(let r=0;r<4;r++)for(let k=0;k<24;k++){const [x,y]=[[-1.25,-1.18],[1.25,-1.18],[1.25,1.18],[-1.25,1.18]][r];pins.push([x,y,-.98+1.96*(k+(r+.5)/4)/24]);labels.push(`barre ${r+1} · ${String(k+1).padStart(2,'0')}`);}return {pins,anchorLabels:labels};}
export function parseOBJ(text,name,{raw=false}={}){const limit=raw?1000000:100000;const p=[],indices=[];for(const line of text.split(/\r?\n/)){const fields=line.split('#')[0].trim().split(/\s+/);if(fields[0]==='v'){if(fields.length<4)throw Error('Sommet OBJ incomplet.');p.push(...fields.slice(1,4).map(Number));}else if(fields[0]==='f'){const f=fields.slice(1).map(x=>{const n=Number(x.split('/')[0]);if(!Number.isInteger(n)||!n)throw Error('Indice de face OBJ incorrect.');return n<0?p.length/3+n:n-1;});if(f.length<3)throw Error('Face OBJ incomplète.');for(let j=1;j<f.length-1;j++)indices.push(f[0],f[j],f[j+1]);}if(p.length>limit*3||indices.length>limit*3)throw Error('Ce volume dépasse la limite de sommets ou triangles.');}const model={name,positions:new Float32Array(p),indices:new Uint32Array(indices)};validateMesh(model,limit);return raw?model:normalizeMesh(model);}
export function parseSTL(buffer,name,{raw=false}={}){
  const view=new DataView(buffer),positions=[],indices=[],known=new Map();
  const add=(x,y,z)=>{
    if(![x,y,z].every(Number.isFinite)||Math.max(Math.abs(x),Math.abs(y),Math.abs(z))>1e9)throw Error('Coordonnée STL incorrecte.');
    // STL / MakerWorld use Z-up; the studio uses Y-up and +Z toward the face.
    const p=[x,z,-y],key=p.join(',');let id=known.get(key);
    if(id===undefined){id=positions.length/3;known.set(key,id);positions.push(...p);}
    indices.push(id);
    if(indices.length>3000000||positions.length>3000000)throw Error('Le STL dépasse un million de sommets ou triangles.');
  };
  const count=buffer.byteLength>=84?view.getUint32(80,true):0;
  if(count>0&&84+count*50===buffer.byteLength){
    if(count>1000000)throw Error('Le STL dépasse un million de triangles.');
    for(let i=0;i<count;i++)for(let j=0;j<3;j++){
      const offset=84+i*50+12+j*12;add(view.getFloat32(offset,true),view.getFloat32(offset+4,true),view.getFloat32(offset+8,true));
    }
  }else{
    const text=new TextDecoder().decode(buffer);
    if(!/^\s*solid\b/i.test(text)||!/^\s*endsolid\b/im.test(text))throw Error('STL binaire incomplet ou STL ASCII incorrect.');
    const facets=[...text.matchAll(/\bfacet\b([\s\S]*?)\bendfacet\b/gi)];
    if(!facets.length||facets.length!==(text.match(/\bfacet\b/gi)||[]).length)throw Error('Faces STL incomplètes.');
    for(const facet of facets){
      const vertices=[...facet[1].matchAll(/\bvertex\s+(\S+)\s+(\S+)\s+(\S+)/gi)];
      if(vertices.length!==3)throw Error('Une face STL doit contenir trois sommets.');
      for(const vertex of vertices)add(...vertex.slice(1).map(Number));
    }
  }
  const model={name,positions:new Float32Array(positions),indices:new Uint32Array(indices)};
  validateMesh(model,raw?1000000:100000);
  return raw?model:normalizeMesh(model);
}
const identity=()=>[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];
function multiply(a,b){const c=new Array(16).fill(0);for(let col=0;col<4;col++)for(let row=0;row<4;row++)for(let k=0;k<4;k++)c[col*4+row]+=a[k*4+row]*b[col*4+k];return c;}
function transform(node){if(node.matrix)return node.matrix;const [x,y,z,w]=node.rotation||[0,0,0,1],s=node.scale||[1,1,1],t=node.translation||[0,0,0];return [(1-2*y*y-2*z*z)*s[0],(2*x*y+2*z*w)*s[0],(2*x*z-2*y*w)*s[0],0,(2*x*y-2*z*w)*s[1],(1-2*x*x-2*z*z)*s[1],(2*y*z+2*x*w)*s[1],0,(2*x*z+2*y*w)*s[2],(2*y*z-2*x*w)*s[2],(1-2*x*x-2*y*y)*s[2],0,...t,1];}
export function parseGLB(buffer,name,{raw=false}={}){const limit=raw?1000000:100000;const dv=new DataView(buffer);if(buffer.byteLength<28||dv.getUint32(0,true)!==0x46546c67||dv.getUint32(4,true)!==2||dv.getUint32(8,true)!==buffer.byteLength)throw Error('Fichier GLB 2.0 attendu.');let json,bin;for(let offset=12;offset+8<=buffer.byteLength;){const size=dv.getUint32(offset,true),kind=dv.getUint32(offset+4,true);offset+=8;if(offset+size>buffer.byteLength)throw Error('GLB incomplet.');if(kind===0x4e4f534a)json=JSON.parse(new TextDecoder().decode(new Uint8Array(buffer,offset,size)));if(kind===0x004e4942)bin=new DataView(buffer,offset,size);offset+=size;}if(!json||!bin)throw Error('Le GLB doit contenir son maillage.');if(json.animations?.length||json.skins?.length)throw Error('Exportez un GLB statique, sans animation ni squelette.');
  function accessor(id,channels){const a=json.accessors?.[id],v=json.bufferViews?.[a?.bufferView];if(!a||!v||v.extensions||a.sparse||v.buffer!==0)throw Error('GLB compressé ou externe : exportez un maillage simple sans Draco ni Meshopt.');if(a.type!==({1:'SCALAR',3:'VEC3'}[channels]))throw Error('Format de sommets GLB non pris en charge.');const readers={5121:['getUint8',1],5123:['getUint16',2],5125:['getUint32',4],5126:['getFloat32',4]},r=readers[a.componentType];if(!r||!Number.isInteger(a.count)||a.count>limit*3)throw Error('Données GLB trop grandes ou non prises en charge.');const stride=v.byteStride||r[1]*channels,start=(v.byteOffset||0)+(a.byteOffset||0),out=[];if(start+Math.max(0,a.count-1)*stride+channels*r[1]>bin.byteLength)throw Error('Données GLB hors limites.');for(let i=0;i<a.count;i++)for(let j=0;j<channels;j++)out.push(bin[r[0]](start+i*stride+j*r[1],true));return out;}
  const p=[],indices=[],active=new Set();let visits=0;function mesh(id,m){const source=json.meshes?.[id];if(!source)throw Error('Maillage GLB absent.');for(const prim of source.primitives){if(prim.extensions||prim.targets||(prim.mode!==undefined&&prim.mode!==4))throw Error('Exportez uniquement des triangles statiques sans compression.');const vertices=accessor(prim.attributes.POSITION,3),ids=prim.indices===undefined?Array.from({length:vertices.length/3},(_,i)=>i):accessor(prim.indices,1),base=p.length/3;for(let i=0;i<vertices.length;i+=3){const x=vertices[i],y=vertices[i+1],z=vertices[i+2];p.push(m[0]*x+m[4]*y+m[8]*z+m[12],m[1]*x+m[5]*y+m[9]*z+m[13],m[2]*x+m[6]*y+m[10]*z+m[14]);}for(const id of ids){if(id<0||id>=vertices.length/3||!Number.isInteger(id))throw Error('Indice GLB incorrect.');indices.push(id+base);}if(p.length>limit*3||indices.length>limit*3)throw Error('Ce volume dépasse la limite de sommets ou triangles.');}}
  function visit(id,parent){if(active.has(id)||++visits>2000)throw Error('Hiérarchie GLB incorrecte ou trop complexe.');const n=json.nodes?.[id];if(!n)throw Error('Nœud GLB absent.');active.add(id);const m=multiply(parent,transform(n));if(m.some(v=>!Number.isFinite(v)))throw Error('Transformation GLB incorrecte.');if(n.mesh!==undefined)mesh(n.mesh,m);for(const child of n.children||[])visit(child,m);active.delete(id);}
  const scene=json.scenes?.[json.scene||0];if(scene)for(const id of scene.nodes||[])visit(id,identity());else if(json.nodes?.length){const children=new Set(json.nodes.flatMap(n=>n.children||[]));json.nodes.forEach((_,i)=>{if(!children.has(i))visit(i,identity());});}else json.meshes?.forEach((_,i)=>mesh(i,identity()));const model={name,positions:new Float32Array(p),indices:new Uint32Array(indices)};validateMesh(model,limit);return raw?model:normalizeMesh(model);
}

// Bounding-volume hierarchy for fixed, world-space dye intervals.
export function makeBVH(model){const {positions:p,indices:t}=model,tri=[];for(let i=0;i<t.length;i+=3){const a=t[i]*3,b=t[i+1]*3,c=t[i+2]*3,lo=[0,1,2].map(k=>Math.min(p[a+k],p[b+k],p[c+k])),hi=[0,1,2].map(k=>Math.max(p[a+k],p[b+k],p[c+k]));tri.push({a,b,c,lo,hi,center:lo.map((v,k)=>(v+hi[k])/2)});}function node(list){const lo=[Infinity,Infinity,Infinity],hi=[-Infinity,-Infinity,-Infinity];for(const f of list)for(let k=0;k<3;k++){lo[k]=Math.min(lo[k],f.lo[k]);hi[k]=Math.max(hi[k],f.hi[k]);}if(list.length<=12)return {lo,hi,tri:list};const ext=hi.map((v,k)=>v-lo[k]),axis=ext.indexOf(Math.max(...ext));list.sort((a,b)=>a.center[axis]-b.center[axis]);const mid=list.length>>1;return {lo,hi,left:node(list.slice(0,mid)),right:node(list.slice(mid))};}return {tree:node(tri),positions:p};}
export function crossings(bvh,a,b){const d=b.map((v,k)=>v-a[k]),p=bvh.positions,hits=[];function box(n){let lo=0,hi=1;for(let k=0;k<3;k++){if(Math.abs(d[k])<1e-12){if(a[k]<n.lo[k]-1e-7||a[k]>n.hi[k]+1e-7)return false;}else{let u=(n.lo[k]-a[k])/d[k],v=(n.hi[k]-a[k])/d[k];if(u>v)[u,v]=[v,u];lo=Math.max(lo,u);hi=Math.min(hi,v);if(lo>hi)return false;}}return true;}
 function visit(n){if(!box(n))return;if(!n.tri){visit(n.left);visit(n.right);return;}for(const f of n.tri){const e=[p[f.b]-p[f.a],p[f.b+1]-p[f.a+1],p[f.b+2]-p[f.a+2]],g=[p[f.c]-p[f.a],p[f.c+1]-p[f.a+1],p[f.c+2]-p[f.a+2]],h=[d[1]*g[2]-d[2]*g[1],d[2]*g[0]-d[0]*g[2],d[0]*g[1]-d[1]*g[0]],det=e[0]*h[0]+e[1]*h[1]+e[2]*h[2];if(Math.abs(det)<1e-12)continue;const s=[a[0]-p[f.a],a[1]-p[f.a+1],a[2]-p[f.a+2]],u=(s[0]*h[0]+s[1]*h[1]+s[2]*h[2])/det;if(u< -1e-7||u>1.0000001)continue;const q=[s[1]*e[2]-s[2]*e[1],s[2]*e[0]-s[0]*e[2],s[0]*e[1]-s[1]*e[0]],v=(d[0]*q[0]+d[1]*q[1]+d[2]*q[2])/det;if(v< -1e-7||u+v>1.0000001)continue;const tt=(g[0]*q[0]+g[1]*q[1]+g[2]*q[2])/det;if(tt<=0||tt>=1)continue;const normal=[e[1]*g[2]-e[2]*g[1],e[2]*g[0]-e[0]*g[2],e[0]*g[1]-e[1]*g[0]],inc=Math.abs(normal[0]*d[0]+normal[1]*d[1]+normal[2]*d[2])/(Math.hypot(...normal)*Math.hypot(...d)||1);hits.push([tt,inc]);}}visit(bvh.tree);hits.sort((a,b)=>a[0]-b[0]);return hits.filter((v,i)=>!i||v[0]-hits[i-1][0]>1e-7);}
export function mergeIntervals(intervals){const out=[];for(let [a,b] of intervals.sort((x,y)=>x[0]-y[0])){a=clamp(a,0,1);b=clamp(b,0,1);if(b-a<1/65535)continue;if(out.length&&a<=out.at(-1)[1]+2/65535)out.at(-1)[1]=Math.max(out.at(-1)[1],b);else out.push([a,b]);}return out;}

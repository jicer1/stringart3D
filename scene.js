import {clamp,pieces,threadTubeGeometry} from './geometry.js?v=1.0.13';
const B=window.BABYLON;
const radians=v=>v*Math.PI/180;
export class ThreadScene {
  constructor(canvas,onCamera){
    if(!B?.Engine.isSupported())throw Error('WebGL est indisponible. Essayez Edge, Chrome ou Firefox avec l’accélération graphique activée.');
    this.canvas=canvas;this.onCamera=onCamera;this.engine=new B.Engine(canvas,true,{preserveDrawingBuffer:true,stencil:false,powerPreference:'high-performance'});this.engine.setHardwareScalingLevel(1/Math.min(2,window.devicePixelRatio||1));
    this.scene=new B.Scene(this.engine);this.scene.useRightHandedSystem=true;this.scene.clearColor=new B.Color4(237/255,236/255,228/255,1);
    this.camera=new B.ArcRotateCamera('camera',Math.PI/2,Math.PI/2,8,B.Vector3.Zero(),this.scene);this.camera.mode=B.Camera.ORTHOGRAPHIC_CAMERA;this.camera.minZ=.01;this.camera.maxZ=30;
    const light=new B.HemisphericLight('ambient',new B.Vector3(0,1,0),this.scene);light.intensity=.7;const key=new B.DirectionalLight('key',new B.Vector3(.45,-.65,-1),this.scene);key.intensity=.85;
    this.yaw=35;this.pitch=6;this.zoom=1;this.panX=0;this.panY=0;this.mode='threads';this.count=0;this.style='inside';this.showFrames=true;this.highlight=false;this.opacity=.05;this.diameterMm=.4;this.swelling=3;this.heightCm=40;this.dirty=true;
    B.Effect.ShadersStore.threadVertexShader=`precision highp float;
      attribute vec3 position; attribute vec3 other; attribute float side; attribute float ink;
      uniform mat4 viewProjection; uniform vec2 resolution; uniform float width; uniform float portraitWidth; varying float vInk;
      void main(){vec4 p=viewProjection*vec4(position,1.0);vec4 q=viewProjection*vec4(other,1.0);vec2 d=(q.xy/q.w-p.xy/p.w)*resolution;float n=length(d);vec2 normal=n>0.0001?vec2(-d.y,d.x)/n:vec2(0.0);p.xy+=normal*side*mix(width,portraitWidth,ink)/resolution*p.w;gl_Position=p;vInk=ink;}`;
    B.Effect.ShadersStore.threadFragmentShader=`precision highp float;varying float vInk;uniform vec3 portrait;uniform vec3 veil;uniform float opacity;void main(){gl_FragColor=vec4(mix(veil,portrait,vInk),opacity);}`;
    this.material=this.tubeMaterial();this.frameMaterial=this.ribbonMaterial('cadres',.28,.7);this.frameMaterial.setColor3('portrait',B.Color3.FromHexString('#77836c'));this.frameMaterial.setColor3('veil',B.Color3.FromHexString('#77836c'));
    this.highlightMaterial=this.ribbonMaterial('passage',.9,2);this.highlightMaterial.setColor3('portrait',B.Color3.FromHexString('#d47741'));this.highlightMaterial.setColor3('veil',B.Color3.FromHexString('#587054'));
    this.buildFrames(9);this.inputs();
    this.observer=new ResizeObserver(()=>{this.engine.resize();this.fit();this.invalidate();});this.observer.observe(canvas);
    this.engine.runRenderLoop(()=>{if(document.hidden)return;if(this.tick)this.tick(performance.now());this.updateUniforms();this.scene.render();this.dirty=false;});
    this.engine.onContextLostObservable.add(()=>this.onContext?.(false));this.engine.onContextRestoredObservable.add(()=>{this.invalidate();this.onContext?.(true);});
    this.setCamera(35,6,1);
  }
  tubeMaterial(){
    B.Effect.ShadersStore.variableThreadVertexShader=`precision highp float;
      attribute vec3 position; attribute vec3 normal; attribute float ink; attribute float radiusWeight;
      uniform mat4 viewProjection; uniform float baseRadius; uniform float swelling;
      varying vec3 vNormal; varying float vInk;
      void main(){float radius=baseRadius*mix(1.0,swelling,radiusWeight);gl_Position=viewProjection*vec4(position+normal*radius,1.0);vNormal=normal;vInk=ink;}`;
    B.Effect.ShadersStore.variableThreadFragmentShader=`precision highp float;
      varying vec3 vNormal; varying float vInk; uniform vec3 portrait; uniform vec3 veil; uniform float opacity;
      void main(){float light=.60+.40*max(0.0,dot(normalize(vNormal),normalize(vec3(-.4,.7,1.0))));gl_FragColor=vec4(mix(veil,portrait,vInk)*light,mix(opacity*.4,opacity,vInk));}`;
    const m=new B.ShaderMaterial('fil-volume',this.scene,{vertex:'variableThread',fragment:'variableThread'},{attributes:['position','normal','ink','radiusWeight'],uniforms:['viewProjection','baseRadius','swelling','portrait','veil','opacity'],needAlphaBlending:true});
    m.backFaceCulling=true;m.disableDepthWrite=true;m.alphaMode=B.Engine.ALPHA_COMBINE;return m;
  }
  ribbonMaterial(name,opacity,width){const m=new B.ShaderMaterial(name,this.scene,{vertex:'thread',fragment:'thread'},{attributes:['position','other','side','ink'],uniforms:['viewProjection','resolution','width','portraitWidth','portrait','veil','opacity'],needAlphaBlending:true});m.backFaceCulling=false;m.disableDepthWrite=true;m.disableDepthTest=true;m.alphaMode=B.Engine.ALPHA_COMBINE;m.setFloat('opacity',opacity);m.setFloat('width',width);m.setFloat('portraitWidth',width);return m;}
  ribbon(name,segments,material){const positions=[],other=[],side=[],ink=[],indices=[];for(const [a,b,color] of segments){const start=positions.length/3;positions.push(...a,...a,...b,...b);other.push(...b,...b,...a,...a);side.push(1,-1,-1,1);ink.push(color,color,color,color);indices.push(start,start+1,start+2,start+1,start+3,start+2);}const mesh=new B.Mesh(name,this.scene);mesh.setVerticesData('position',positions,false,3);mesh.setVerticesData('other',other,false,3);mesh.setVerticesData('side',side,false,1);mesh.setVerticesData('ink',ink,false,1);mesh.setIndices(indices);if(mesh.subMeshes[0])mesh.subMeshes[0].setBoundingInfo(mesh.getBoundingInfo());mesh.material=material;mesh.isPickable=false;mesh.alwaysSelectAsActiveMesh=true;mesh.renderingGroupId=1;return mesh;}
  updateUniforms(){
    const ratio=this.engine.getRenderWidth()/Math.max(1,this.canvas.clientWidth),resolution=new B.Vector2(this.engine.getRenderWidth(),(this.viewportHeight||this.canvas.clientHeight)*ratio);
    for(const [material,width] of [[this.frameMaterial,.65],[this.highlightMaterial,1.9]]){material.setVector2('resolution',resolution);material.setFloat('width',width*ratio);material.setFloat('portraitWidth',width*ratio);}
    this.material.setFloat('baseRadius',this.diameterMm*2.36/(this.heightCm*10*2));
    this.material.setFloat('swelling',this.style==='mono'?1:this.swelling);
    this.material.setFloat('opacity',clamp(.35*this.intensity/100,.04,.85));
  }
  invalidate(){this.dirty=true;}
  buildFrames(frames){this.frameMesh?.dispose();const segments=[];for(let i=0;i<frames;i++){const z=-.98+1.96*i/(frames-1),corners=[[-1.25,-1.18,z],[1.25,-1.18,z],[1.25,1.18,z],[-1.25,1.18,z]];for(let k=0;k<4;k++)segments.push([corners[k],corners[(k+1)%4],1]);}for(const [x,y] of [[-1.25,-1.18],[1.25,-1.18],[1.25,1.18],[-1.25,1.18]])segments.push([[x,y,-.98],[x,y,.98],1]);this.frameMesh=this.ribbon('cadres',segments,this.frameMaterial);this.frameMesh.renderingGroupId=0;this.frameMesh.setEnabled(this.showFrames);}
  setStudy(study,variant){this.study=study;this.variant=variant;this.buildFrames(study.frames);this.pinMesh?.dispose();this.pinMaterial?.dispose();const pins=study.pins.slice(0,variant.pinCount),positions=pins.flat();this.pinMesh=new B.Mesh('clous',this.scene);this.pinMesh.setVerticesData(B.VertexBuffer.PositionKind,positions);this.pinMesh.setIndices(pins.map((_,i)=>i));this.pinMaterial=new B.StandardMaterial('clous',this.scene);this.pinMaterial.disableLighting=true;this.pinMaterial.emissiveColor=B.Color3.FromHexString('#81916b');this.pinMaterial.pointsCloud=true;this.pinMaterial.pointSize=2.4*Math.min(2,window.devicePixelRatio||1);this.pinMaterial.alpha=.75;this.pinMesh.material=this.pinMaterial;this.pinMesh.isPickable=false;this.pinMesh.setEnabled(this.showFrames);this.buildThreads();this.invalidate();}
  setModel(model){this.modelMesh?.dispose();this.modelMaterial?.dispose();const mesh=new B.Mesh('volume-source',this.scene),data=new B.VertexData();data.positions=model.positions;data.normals=model.normals;data.indices=model.indices;data.applyToMesh(mesh);const m=new B.StandardMaterial('argile',this.scene);m.diffuseColor=B.Color3.FromHexString('#adbea7');m.specularColor=new B.Color3(.1,.1,.08);m.backFaceCulling=false;mesh.material=m;mesh.isPickable=false;this.modelMesh=mesh;this.modelMaterial=m;mesh.setEnabled(this.mode==='model');this.invalidate();}
  buildThreads(){
    if(!this.study||!this.variant)return;
    this.threadMesh?.dispose();
    const data=threadTubeGeometry(this.study,this.variant,this.style),mesh=new B.Mesh('fil-continu',this.scene);this.ends=data.ends;
    mesh.setVerticesData('position',data.positions,false,3);mesh.setVerticesData('normal',data.normals,false,3);mesh.setVerticesData('ink',data.ink,false,1);mesh.setVerticesData('radiusWeight',data.swelling,false,1);mesh.setIndices(data.indices);
    if(mesh.subMeshes[0])mesh.subMeshes[0].setBoundingInfo(mesh.getBoundingInfo());
    mesh.material=this.material;mesh.overrideMaterialSideOrientation=B.Material.CounterClockWiseSideOrientation;mesh.isPickable=false;mesh.alwaysSelectAsActiveMesh=true;mesh.renderingGroupId=1;this.threadMesh=mesh;this.setCount(this.count);
  }
  setCount(count){this.count=clamp(Math.floor(count),0,this.variant?.route.length-1||0);if(this.threadMesh){this.threadMesh.setEnabled(this.mode==='threads'&&this.count>0);if(this.threadMesh.subMeshes[0])this.threadMesh.subMeshes[0].indexCount=this.ends[this.count]||0;}this.updateHighlight();this.invalidate();}
  updateHighlight(){this.highlightMesh?.dispose();this.highlightMesh=null;if(!this.highlight||this.mode!=='threads'||!this.count||!this.study)return;const i=this.count-1,a=this.study.pins[this.variant.route[i]],b=this.study.pins[this.variant.route[i+1]],segments=pieces(this.variant,this.style,i).map(([from,to,ink])=>[a.map((v,k)=>v+(b[k]-v)*from),a.map((v,k)=>v+(b[k]-v)*to),ink]);this.highlightMesh=this.ribbon('passage-courant',segments,this.highlightMaterial);this.highlightMesh.renderingGroupId=2;}
  setAppearance(options){const previousStyle=this.style;Object.assign(this,options);for(const m of [this.material,this.highlightMaterial]){m.setColor3('portrait',B.Color3.FromHexString(this.portraitColor||'#2c67c5'));m.setColor3('veil',B.Color3.FromHexString(this.veilColor||'#aeb4b0'));}this.modelMesh?.setEnabled(this.mode==='model');this.frameMesh?.setEnabled(this.showFrames);this.pinMesh?.setEnabled(this.showFrames);if(previousStyle!==this.style)this.buildThreads();else this.setCount(this.count);this.invalidate();}
  fit(){
    if(!this.camera)return;
    const yaw=radians(this.yaw),pitch=radians(this.pitch),width=Math.max(1,this.canvas.clientWidth),height=Math.max(1,this.canvas.clientHeight);
    // The title and controls are overlays: they never subtract from the 3D viewport.
    this.viewportHeight=height;this.camera.viewport=new B.Viewport(0,0,1,1);
    let maxX=0,maxY=0;
    for(const x of [-1.25,1.25])for(const y of [-1.18,1.18])for(const z of [-.98,.98]){
      const xx=x*Math.cos(yaw)+z*Math.sin(yaw),zz=-x*Math.sin(yaw)+z*Math.cos(yaw),yy=y*Math.cos(pitch)-zz*Math.sin(pitch);
      maxX=Math.max(maxX,Math.abs(xx));maxY=Math.max(maxY,Math.abs(yy));
    }
    // Leave only six screen pixels for the nail dots and antialiased thread edges.
    const padding=Math.min(6,width/4,height/4),ratio=width/height,half=Math.max(maxY/(1-2*padding/height),maxX/(ratio*(1-2*padding/width)))/this.zoom;
    this.camera.orthoTop=half-this.panY;this.camera.orthoBottom=-half-this.panY;this.camera.orthoLeft=-half*ratio-this.panX;this.camera.orthoRight=half*ratio-this.panX;this.invalidate();
  }
  setCamera(yaw=this.yaw,pitch=this.pitch,zoom=this.zoom,panX=this.panX,panY=this.panY){this.yaw=((yaw+540)%360)-180;this.pitch=clamp(pitch,-85,85);this.zoom=clamp(zoom,.6,2.5);this.panX=Number.isFinite(panX)?clamp(panX,-100,100):0;this.panY=Number.isFinite(panY)?clamp(panY,-100,100):0;this.camera.alpha=Math.PI/2+radians(this.yaw);this.camera.beta=Math.PI/2-radians(this.pitch);this.fit();this.onCamera?.({yaw:this.yaw,pitch:this.pitch,zoom:this.zoom,panX:this.panX,panY:this.panY});}
  pan(dx,dy){const units=(this.camera.orthoTop-this.camera.orthoBottom)/Math.max(1,this.canvas.clientHeight);this.setCamera(this.yaw,this.pitch,this.zoom,this.panX+dx*units,this.panY-dy*units);}
  resetCamera(){this.setCamera(35,6,1,0,0);}
  inputs(){
    const points=new Map();let last=null,pinch=0,dragButton=0;
    const end=e=>{points.delete(e.pointerId);last=null;pinch=0;if(!points.size){dragButton=0;this.canvas.classList.remove('is-panning');}};
    this.canvas.addEventListener('contextmenu',e=>e.preventDefault());
    this.canvas.addEventListener('pointerdown',e=>{
      if(e.pointerType==='mouse'&&e.button!==0&&e.button!==2)return;
      dragButton=e.button===2?2:0;if(dragButton===2)e.preventDefault();
      points.set(e.pointerId,[e.clientX,e.clientY]);this.canvas.setPointerCapture(e.pointerId);last=[e.clientX,e.clientY];pinch=0;
      this.canvas.classList.toggle('is-panning',dragButton===2);
    });
    this.canvas.addEventListener('pointermove',e=>{
      if(!points.has(e.pointerId))return;
      if(e.pointerType==='mouse'&&!(e.buttons&(dragButton===2?2:1))){end(e);return;}
      points.set(e.pointerId,[e.clientX,e.clientY]);
      if(points.size===2){const [a,b]=[...points.values()],d=Math.hypot(a[0]-b[0],a[1]-b[1]);if(pinch)this.setCamera(this.yaw,this.pitch,this.zoom*d/pinch);pinch=d;last=null;}
      else if(last){const dx=e.clientX-last[0],dy=e.clientY-last[1];if(dragButton===2)this.pan(dx,dy);else this.setCamera(this.yaw+dx*.38,this.pitch+dy*.32);last=[e.clientX,e.clientY];}
      else last=[e.clientX,e.clientY];
    });
    for(const event of ['pointerup','pointercancel','lostpointercapture'])this.canvas.addEventListener(event,end);
    this.canvas.addEventListener('wheel',e=>{e.preventDefault();this.setCamera(this.yaw,this.pitch,this.zoom*Math.exp(-e.deltaY*.001));},{passive:false});
    this.canvas.addEventListener('dblclick',e=>{if(e.button===0)this.resetCamera();});
    this.canvas.addEventListener('keydown',e=>{const moves={ArrowLeft:[-5,0],ArrowRight:[5,0],ArrowUp:[0,-5],ArrowDown:[0,5]};if(moves[e.key]){e.preventDefault();this.setCamera(this.yaw+moves[e.key][0],this.pitch+moves[e.key][1]);}else if(['+','=','-'].includes(e.key)){e.preventDefault();this.setCamera(this.yaw,this.pitch,this.zoom*(e.key==='-'?.9:1.1));}});
  }
  capture(){this.invalidate();this.updateUniforms();this.scene.render();return this.canvas.toDataURL('image/png');}
  dispose(){this.observer.disconnect();this.scene.dispose();this.engine.dispose();}
}

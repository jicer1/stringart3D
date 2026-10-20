// Local launcher only. The public file list deliberately excludes study caches and tools.
const http=require('node:http'),fs=require('node:fs'),path=require('node:path'),{execFile}=require('node:child_process');
const root=path.resolve(__dirname,process.env.STRINGART3D_ROOT||'.'),port=Number(process.env.STRINGART3D_PORT||8793),open=process.argv.includes('--open')&&!process.env.STRINGART3D_NO_OPEN;
if(!Number.isInteger(port)||port<1024||port>65535){console.error('Port incorrect.');process.exit(1);}
const files=new Set(['index.html','style.css','i18n.js','app.js','scene.js','geometry.js','calculator.worker.js','import.worker.js','icon.svg','version.json','AIDE.md','CREDITS.txt','assets/demo.json','assets/demo-anne.json','assets/Anne_License.txt','assets/LeePerrySmith_License.txt','vendor/babylon.js','vendor/LICENSE.babylon.md','vendor/meshopt_simplifier.js','vendor/LICENSE.meshoptimizer.md']);
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.md':'text/plain; charset=utf-8','.txt':'text/plain; charset=utf-8'};
const address='http://127.0.0.1:'+port+'/';
function openBrowser(){if(open&&process.platform==='win32')execFile('cmd.exe',['/d','/c','start','',address],{windowsHide:true},err=>{if(err)console.log('Ouvrez cette adresse dans votre navigateur : '+address);});}
const server=http.createServer((req,res)=>{
  const headers={'X-StringArt3D':'1.0.13','Cache-Control':'no-cache, max-age=0, must-revalidate','X-Content-Type-Options':'nosniff','Referrer-Policy':'strict-origin-when-cross-origin'};
  if(req.method!=='GET'&&req.method!=='HEAD'){res.writeHead(405,{...headers,Allow:'GET, HEAD'});return res.end('Méthode non autorisée');}
  let name;try{name=decodeURIComponent(new URL(req.url,'http://127.0.0.1').pathname).replace(/^\//,'')||'index.html';}catch{res.writeHead(400,headers);return res.end('Adresse incorrecte');}
  if(!files.has(name)){res.writeHead(404,headers);return res.end('Fichier introuvable');}
  fs.readFile(path.join(root,...name.split('/')),(err,data)=>{if(err){res.writeHead(404,headers);return res.end('Fichier introuvable');}res.writeHead(200,{...headers,'Content-Type':mime[path.extname(name)]||'application/octet-stream','Content-Length':data.length});res.end(req.method==='HEAD'?undefined:data);});
});
server.on('error',error=>{if(error.code!=='EADDRINUSE'){console.error(error.message);process.exitCode=1;return;}http.get(address+'version.json',res=>{let data='';res.on('data',part=>{if(data.length<4096)data+=part;});res.on('end',()=>{try{const info=JSON.parse(data);if(info.name==='stringart3D'){console.log('stringart3D est déjà ouvert : '+address);openBrowser();return;}}catch{}console.error('Le port '+port+' est occupé par un autre programme.');console.error('Choisissez un autre STRINGART3D_PORT dans le lanceur.');process.exitCode=1;});}).on('error',()=>{console.error('Le port '+port+' est indisponible.');process.exitCode=1;});});
server.listen(port,'127.0.0.1',()=>{console.log('\n  stringart3D · Jacinto Costoso · v1.0.13\n\n  '+address+'\n\n  Gardez cette fenêtre ouverte pour utiliser l’atelier.\n  Ctrl+C pour arrêter le serveur.\n');openBrowser();});

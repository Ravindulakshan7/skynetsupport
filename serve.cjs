// Local preview only; production hosting serves the same static files directly.
const http=require('node:http');
const fs=require('node:fs');
const path=require('node:path');
const root=__dirname;
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.json':'application/json','.splinecode':'application/octet-stream'};
http.createServer((request,response)=>{
  if(!['GET','HEAD'].includes(request.method)){response.writeHead(405);response.end();return;}
  let name;
  try{name=decodeURIComponent(new URL(request.url,'http://127.0.0.1').pathname);}catch{response.writeHead(400);response.end();return;}
  const segments=name.split(/[\\/]/).filter(Boolean);
  if(segments.some(segment=>segment.startsWith('.'))){response.writeHead(404);response.end();return;}
  const target=path.resolve(root,...segments, name.endsWith('/')?'index.html':'');
  if(target!==root&&!target.startsWith(root+path.sep)){response.writeHead(404);response.end();return;}
  fs.stat(target,(error,stat)=>{
    if(error||!stat.isFile()){response.writeHead(404);response.end('Not found');return;}
    response.writeHead(200,{'Content-Type':types[path.extname(target).toLowerCase()]||'application/octet-stream','Content-Length':stat.size,'Cache-Control':'no-store'});
    if(request.method==='HEAD'){response.end();return;}
    const stream=fs.createReadStream(target);stream.on('error',()=>response.destroy());stream.pipe(response);
  });
}).listen(5173,'127.0.0.1',()=>console.log('SKYNET preview: http://127.0.0.1:5173/site.html'));

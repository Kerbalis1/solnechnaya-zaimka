import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
const root = resolve('out');
const base = (process.env.NEXT_PUBLIC_BASE_PATH || '').replace(/\/$/, '');
const types = { '.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.webp':'image/webp','.jpg':'image/jpeg','.png':'image/png','.woff2':'font/woff2','.txt':'text/plain' };
const server = createServer(async (req,res) => {
 try {
  let path = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  if (base && path !== base && !path.startsWith(base + '/')) { res.writeHead(404);res.end('Not found');return; }
  if (base) path = path.slice(base.length);
  let file = resolve(root, '.' + (path || '/'));
  if (file !== root && !file.startsWith(root + sep)) { res.writeHead(403);res.end();return; }
  if ((await stat(file)).isDirectory()) file = resolve(file, 'index.html');
  res.writeHead(200,{'Content-Type':types[extname(file)] || 'application/octet-stream'});res.end(await readFile(file));
 } catch { res.writeHead(404);res.end('Not found'); }
});
server.listen(Number(process.env.PORT || 3000), '127.0.0.1', () => console.log(`Local: http://localhost:${process.env.PORT || 3000}${base}/`));

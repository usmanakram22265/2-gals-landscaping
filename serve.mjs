// serve.mjs — zero-dependency static file server for the project root.
// Usage: node serve.mjs   →   http://localhost:3000
import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT) || 3000;
const HOST = "localhost";

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".otf": "font/otf",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".txt": "text/plain; charset=utf-8",
  ".map": "application/json; charset=utf-8",
};

function send(res, status, body, headers = {}) {
  res.writeHead(status, { "Cache-Control": "no-store", ...headers });
  res.end(body);
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    let pathname = decodeURIComponent(url.pathname);
    if (pathname.endsWith("/")) pathname += "index.html";

    // Resolve within ROOT and block path traversal.
    const filePath = path.normalize(path.join(ROOT, pathname));
    if (filePath !== ROOT && !filePath.startsWith(ROOT + path.sep)) {
      return send(res, 403, "Forbidden");
    }

    let info;
    try {
      info = await stat(filePath);
    } catch {
      return send(res, 404, `Not found: ${pathname}`);
    }
    if (info.isDirectory()) {
      return send(res, 302, "", { Location: pathname + "/" });
    }

    const body = await readFile(filePath);
    const type =
      MIME[path.extname(filePath).toLowerCase()] || "application/octet-stream";
    send(res, 200, body, { "Content-Type": type });
  } catch (err) {
    send(res, 500, `Server error: ${err.message}`);
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Serving ${ROOT}`);
  console.log(`→ http://${HOST}:${PORT}`);
});

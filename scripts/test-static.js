import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = 3000;
const OUT_DIR = path.join(process.cwd(), ".next-static");

// Simple static file server
const server = http.createServer((req, res) => {
  // Default to index.html
  let url = req.url === "/" ? "/index.html" : req.url;

  // Handle basePath if configured
  if (url.startsWith("/shellhacks-2024")) {
    url = url.replace("/shellhacks-2024", "");
    if (url === "") url = "/index.html";
  }

  // Decode URL to handle spaces and special characters
  url = decodeURIComponent(url);

  // Add .html extension for directory requests
  if (url.endsWith("/")) {
    url += "index.html";
  }

  // Determine content type
  let contentType = "text/html";
  const ext = path.extname(url).toLowerCase();
  switch (ext) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
    case ".jpeg":
      contentType = "image/jpeg";
      break;
    case ".svg":
      contentType = "image/svg+xml";
      break;
    case ".gif":
      contentType = "image/gif";
      break;
    case ".webp":
      contentType = "image/webp";
      break;
  }

  // Clean the URL to prevent directory traversal
  const cleanUrl = url.replace(/^(\.\.[\/\\])+/, "");
  const filePath = path.join(OUT_DIR, cleanUrl);

  // Read the file
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        // Try with .html extension
        const htmlPath = filePath + ".html";
        fs.readFile(htmlPath, (err2, content2) => {
          if (err2) {
            // Try looking in public directory
            const publicPath = path.join(process.cwd(), "public", cleanUrl);
            fs.readFile(publicPath, (err3, content3) => {
              if (err3) {
                // File not found
                console.error(`404: ${url} (tried ${filePath}, ${htmlPath}, ${publicPath})`);
                res.writeHead(404);
                res.end("404 Not Found");
              } else {
                // Serve the file from public directory
                res.writeHead(200, { "Content-Type": contentType });
                res.end(content3, "utf-8");
              }
            });
          } else {
            // Serve the HTML file
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(content2, "utf-8");
          }
        });
      } else {
        // Server error
        console.error(`500: ${err.code} - ${url}`);
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      // Success
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf-8");
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log(`With basePath: http://localhost:${PORT}/shellhacks-2024/`);
});

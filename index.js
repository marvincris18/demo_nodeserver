// index.js - Node.js server
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;

// MIME types for different file extensions
const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

// Page routes
const ROUTES = {
  '/': 'index.html',
  '/about': 'about.html',
  '/contact-me': 'contact-me.html'
};

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);
  
  // Parse the URL to get the pathname
  let pathname = req.url;
  
  // Remove query string if present
  if (pathname.includes('?')) {
    pathname = pathname.split('?')[0];
  }
  
  // Check if the request is for a static file (CSS, JS, etc.)
  const ext = path.extname(pathname);
  if (ext) {
    serveStaticFile(pathname, res);
    return;
  }
  
  // Check if the path is a defined route
  if (pathname in ROUTES) {
    serveHTMLFile(ROUTES[pathname], res);
  } else {
    // If not a route, serve 404 page
    serveHTMLFile('404.html', res, 404);
  }
});

function serveHTMLFile(filename, res, statusCode = 200) {
  fs.readFile(filename, 'utf8', (err, content) => {
    if (err) {
      console.error(`Error reading file ${filename}:`, err);
      // If we can't read the requested file, try to serve 404 page
      if (filename !== '404.html') {
        serveHTMLFile('404.html', res, 404);
      } else {
        // If we can't even read the 404 page, send a basic response
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      }
      return;
    }
    
    res.writeHead(statusCode, { 'Content-Type': 'text/html' });
    res.end(content);
  });
}

function serveStaticFile(pathname, res) {
  const filename = path.join(process.cwd(), pathname);
  const ext = path.extname(pathname);
  
  fs.readFile(filename, (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('File not found');
      return;
    }
    
    // Determine the correct MIME type for the file
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  });
}

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log(`Available routes:`);
  for (const [route, file] of Object.entries(ROUTES)) {
    console.log(`  http://localhost:${PORT}${route} -> ${file}`);
  }
  console.log(`All other routes will show the 404 page`);
});
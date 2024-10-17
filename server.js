const express = require('express');
const next = require('next');
const path = require('path');
const fs = require('fs');
const compression = require('compression');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Define the builds path relative to the current working directory
const buildsPath = path.join(process.cwd(), 'builds');

// Create the builds directory if it doesn't exist
if (!fs.existsSync(buildsPath)) {
  fs.mkdirSync(buildsPath, { recursive: true });
}

app.prepare().then(() => {
  const server = express();

  // Use compression middleware
  server.use(compression());

  // Serve static files from any subdirectory within the /builds directory
  server.use('/builds/:folder', (req, res, next) => {
    const folder = req.params.folder;
    const folderPath = path.join(buildsPath, folder);
    
    // Check if the folder exists
    if (!fs.existsSync(folderPath)) {
      return res.status(404).send(`Folder not found: ${folder}`);
    }

    // Custom static file serving to handle gzipped files
    express.static(folderPath, {
      index: ['index.html', 'index.htm'],
      setHeaders: (res, filePath) => {
        if (filePath.endsWith('.gz')) {
          res.set('Content-Encoding', 'gzip');
          
          // Remove the .gz extension to check the actual file type
          const originalFilePath = filePath.slice(0, -3);
          
          if (originalFilePath.endsWith('.js')) {
            res.set('Content-Type', 'application/javascript');
          } else if (originalFilePath.endsWith('.wasm')) {
            res.set('Content-Type', 'application/wasm');
          } else if (originalFilePath.endsWith('.css')) {
            res.set('Content-Type', 'text/css');
          }
          // Add more file types as needed
        }
      }
    })(req, res, next);
  });

  // Serve index.html if no specific file is requested
  server.get('/builds/:folder', (req, res) => {
    const folder = req.params.folder;
    const folderPath = path.join(buildsPath, folder);
    const indexPath = path.join(folderPath, 'index.html');
    
    // Check if the file exists
    if (!fs.existsSync(indexPath)) {
      return res.status(404).send('File not found');
    }

    res.sendFile(indexPath, (err) => {
      if (err) {
        console.error(`Error sending file: ${err}`);
        res.status(500).send('Error sending file');
      }
    });
  });

  // Default catch-all handler to allow Next.js to handle all other routes
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  const port = process.env.PORT || 3000;
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});

const fs = require('node:fs/promises');
const path = require('node:path');

async function build() {
  try {
    // 1. Create the 'dist' directory if it doesn't exist
    await fs.mkdir(path.join(__dirname, 'dist'), { recursive: true });

    // 2. Copy necessary files from 'src' to 'dist'
    const filesToCopy = [
      'server.js', 
      'app.js',
      'config', 
      'controllers',
      'models',
      'routes',
      'services',
      'testDB',
      '__tests__',

    ];
    await Promise.all(
      filesToCopy.map(async (file) => {
        const srcPath = path.join(__dirname, 'src', file);
        const destPath = path.join(__dirname, 'dist', file);

        try {
          await fs.stat(srcPath);
          await fs.cp(srcPath, destPath, { recursive: true });
          console.log(`Copied ${file} to dist/`);
        } catch (err) {
          console.error(`Error copying or creating ${file}:`, err);
        }
      })
    );
  } catch (err) {
    console.error('Error during build process:', err);
  }
}

build();
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, 'public');

// Ensure public directory exists
fs.mkdirSync(publicDir, { recursive: true });

// Copy all root HTML files
const htmlFiles = [
  'index.html',
  'about.html',
  'tracking.html',
  'help.html',
  'login.html',
  'signup.html',
  '404.html'
];

for (const file of htmlFiles) {
  const src = path.join(__dirname, file);
  const dest = path.join(publicDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
  }
}

// Copy assets
const srcAssets = path.join(__dirname, 'assets');
const destAssets = path.join(publicDir, 'assets');
fs.mkdirSync(destAssets, { recursive: true });

const srcImages = path.join(srcAssets, 'Images');
if (fs.existsSync(srcImages)) {
  const destImagesUpper = path.join(destAssets, 'Images');
  const destImagesLower = path.join(destAssets, 'images');
  fs.cpSync(srcImages, destImagesUpper, { recursive: true });
  fs.cpSync(srcImages, destImagesLower, { recursive: true });
}

console.log('Build completed: "public" directory created and populated successfully.');

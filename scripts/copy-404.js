import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const source = path.join(__dirname, '..', 'dist', 'index.html');
const destination = path.join(__dirname, '..', 'dist', '404.html');

try {
    fs.copyFileSync(source, destination);
    console.log('Successfully copied index.html to 404.html');
} catch (err) {
    if (err.code === 'ENOENT') {
        console.error('dist/index.html not found. Make sure build runs first.');
    } else {
        console.error('Error copying file:', err);
    }
    process.exit(1);
}

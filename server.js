import express from 'express';
import multer from 'multer';
import cors from 'cors';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// --- Configuration ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PORT = 3001;

const app = express();
app.use(cors());
app.use(express.json());

// --- File Paths ---
const DATA_PATHS = {
    work: join(__dirname, 'src', 'data', 'work', 'data.json'),
    skills: join(__dirname, 'src', 'data', 'skills', 'data.json'),
    contact: join(__dirname, 'src', 'data', 'contact', 'data.json')
};

const IMAGE_PATHS = {
    work: join(__dirname, 'public', 'images', 'work'),
    skills: join(__dirname, 'public', 'images', 'skills'),
    misc: join(__dirname, 'public', 'images', 'misc')
};

// Ensure directories exist
Object.values(IMAGE_PATHS).forEach(path => {
    if (!existsSync(path)) mkdirSync(path, { recursive: true });
});

// --- Helper Functions ---
const readData = (path) => {
    if (!existsSync(path)) return [];
    try {
        const data = readFileSync(path, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error(`Error reading ${path}:`, err);
        return [];
    }
};

const writeData = (path, data) => {
    try {
        writeFileSync(path, JSON.stringify(data, null, 2));
        return true;
    } catch (err) {
        console.error(`Error writing to ${path}:`, err);
        return false;
    }
};

// --- Multer Storage ---
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const type = req.params.type; // 'work', 'skills', 'misc'
        const folder = IMAGE_PATHS[type] || IMAGE_PATHS.misc;
        cb(null, folder);
    },
    filename: (req, file, cb) => {
        // Create unique filenames to avoid collision
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        // Preserve extension
        const ext = file.originalname.split('.').pop();
        cb(null, `${file.originalname.split('.')[0]}-${uniqueSuffix}.${ext}`);
    }
});

const upload = multer({ storage });

// --- Endpoints ---

// 1. Get Data
app.get('/api/:type', (req, res) => {
    const { type } = req.params;
    if (!DATA_PATHS[type]) return res.status(404).json({ error: 'Invalid data type' });

    const data = readData(DATA_PATHS[type]);
    res.json(data);
});

// 2. Add / Update Data (Generic save)
// Expects the FULL array to replace the file content (simplest for now)
// OR could implement specific add/edit. Let's do specific add/edit for better granularity.

// Add Item
app.post('/api/:type', (req, res) => {
    const { type } = req.params;
    if (!DATA_PATHS[type]) return res.status(404).json({ error: 'Invalid data type' });

    const newItem = req.body;
    // Simple validation: must be object
    if (!newItem || typeof newItem !== 'object') return res.status(400).json({ error: 'Invalid item data' });

    const currentData = readData(DATA_PATHS[type]);

    // Assign ID if missing
    if (!newItem.id) newItem.id = Date.now();

    currentData.push(newItem);

    if (writeData(DATA_PATHS[type], currentData)) {
        res.json({ success: true, item: newItem, message: 'Item added successfully' });
    } else {
        res.status(500).json({ error: 'Failed to save data' });
    }
});

// Update Item
app.put('/api/:type/:id', (req, res) => {
    const { type, id } = req.params;
    if (!DATA_PATHS[type]) return res.status(404).json({ error: 'Invalid data type' });

    const updatedItem = req.body;
    const currentData = readData(DATA_PATHS[type]);

    const index = currentData.findIndex(item => item.id == id);
    if (index === -1) return res.status(404).json({ error: 'Item not found' });

    // Merge updates
    currentData[index] = { ...currentData[index], ...updatedItem };

    if (writeData(DATA_PATHS[type], currentData)) {
        res.json({ success: true, item: currentData[index], message: 'Item updated successfully' });
    } else {
        res.status(500).json({ error: 'Failed to save data' });
    }
});

// Delete Item
app.delete('/api/:type/:id', (req, res) => {
    const { type, id } = req.params;
    if (!DATA_PATHS[type]) return res.status(404).json({ error: 'Invalid data type' });

    let currentData = readData(DATA_PATHS[type]);
    const initialLength = currentData.length;

    currentData = currentData.filter(item => item.id != id);

    if (currentData.length === initialLength) return res.status(404).json({ error: 'Item not found' });

    if (writeData(DATA_PATHS[type], currentData)) {
        res.json({ success: true, message: 'Item deleted successfully' });
    } else {
        res.status(500).json({ error: 'Failed to save data' });
    }
});

// Upload Image
app.post('/api/upload/:type', upload.single('image'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const { type } = req.params;
    // Construct public path (e.g., /images/work/filename.jpg)
    const publicPath = `/images/${type || 'misc'}/${req.file.filename}`;

    res.json({
        success: true,
        path: publicPath,
        filename: req.file.filename
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`API Server running on http://localhost:${PORT}`);
});

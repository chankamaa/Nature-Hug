import express from 'express';
import { addPlant, listPlant, updatePlant, deletePlant } from '../controllers/plantController.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const plantRouter = express.Router();

// Ensure the 'uploads' directory exists
const uploadDir = path.join('uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Image Storage Engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// Multer file filter to accept only image files
const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Only images are allowed!'));
    }
};

// Multer instance with file size limit and file type filter
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5MB
    fileFilter: fileFilter
});

// Routes
plantRouter.post('/add', upload.single("image"), addPlant); // Route to add a new plant
plantRouter.get('/', listPlant); // Route to list all plants
plantRouter.put('/update/:id', upload.single("image"), updatePlant); // Route to update a plant
plantRouter.delete('/delete/:id', deletePlant); // Route to delete a plant

export default plantRouter;

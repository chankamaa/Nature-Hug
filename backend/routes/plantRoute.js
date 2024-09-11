import express from 'express';
import { addPlant, listPlant } from '../controllers/plantController.js';
import multer from 'multer';

const plantRouter = express.Router();

// Image Storage Engine
const storage = multer.diskStorage({
    destination: "uploads", // Ensure the 'uploads' directory exists
    filename: (req, file, cb) => {
       cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

// Routes
plantRouter.post('/add', upload.single("image"), addPlant);
plantRouter.get('/', listPlant); // This route handles fetching the list of plants

export default plantRouter;

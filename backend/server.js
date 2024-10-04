import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js'; // Make sure the path is correct
import supplierRouter from './routes/supplierRouter.js';
import stockRouter from './routes/stockRouter.js';
import employeeRoutes from './routes/employeeRoutes.js';
import financeRoutes from './routes/financeRoutes.js';
import attendanceRoutes from './routes/attendanceRoutes.js';
import plantRoutes from './routes/plantRoute.js';


const app = express();
const port = 4000;

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
connectDB();

// Routes
app.use('/api', supplierRouter);
app.use('/api', stockRouter);
app.use('/api', employeeRoutes);
app.use('/api/plants', plantRoutes);
app.use('/images', express.static("uploads"));
app.use('/api', financeRoutes);
app.use('/api', attendanceRoutes);


// Test route
app.get("/", (req, res) => {
    res.send("API is working");
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

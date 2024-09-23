import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'; // Import dotenv
import { connectDB } from './config/db.js';
import supplierRouter from './routes/supplierRouter.js'
import stockRouter from './routes/stockRouter.js'
import employeeRoutes from './routes/employeeRoutes.js';
import financeRoutes from './routes/financeRoutes.js';
import attendanceRoutes from './routes/attendanceRoutes.js';
import plantRoutes from './routes/plantRoute.js';
import promotionsRoute from './routes/promotionsRoute.js';
import campaignRoutes from './routes/campaignRoute.js';


dotenv.config();

// App config
const app = express();
//const port = 4000;
const port = process.env.PORT || 4000; // Use port from .env file if available

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
connectDB();



// API routes with unique paths
app.use('/api/suppliers', supplierRouter);
app.use('/api/stocks', stockRouter);
app.use('/api/employees', employeeRoutes);
app.use('/api/plants', plantRoutes);
app.use('/api/finance', financeRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/campaigns', campaignRoutes); 
app.use('/api/promotions', promotionsRoute);

dotenv.config(); // Load .env variables

// Static files (e.g., images)
app.use('/images', express.static("uploads"));


app.get("/",(req, res) =>{
    res.send("API Is Working")
})


// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

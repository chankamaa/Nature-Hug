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
import emailRoutes from './routes/emailRoutes.js'; 
import cartRoutes from './routes/cartRoutes.js';  // Import cart routes
import promotionsRoute from './routes/promotionsRoute.js';
import campaignRoutes from './routes/campaignRoute.js';
import userRoutes from './routes/userRoutes.js';
import allUserDocRoutes from './routes/allUserDocRoutes.js';
import paymentRoutes from './controllers/paymentController.js';



dotenv.config();

// App config
const app = express();
//const port = 4000;
const port =  4000; // Use port from .env file if available

// Middleware
app.use(express.json());
app.use(cors());


// Database connection
connectDB();


// Route Middlewares
app.use('/NatureHug/user', userRoutes);        // User routes
app.use('/NatureHug/documents', allUserDocRoutes);  // Document routes

// API Routes
app.use('/api/employees', employeeRoutes);     // Employee routes
app.use('/api/finance', financeRoutes);        // Finance routes



//api routes

app.use('/api',supplierRouter);
app.use('/api',stockRouter);
app.use('/api', employeeRoutes);
app.use("/api/plants",plantRoutes);
app.use("/images", express.static("uploads"));
app.use('/api',financeRoutes);
app.use('/api', attendanceRoutes);
app.use('/api', emailRoutes);
app.use('/api', campaignRoutes);
app.use('/api/campaigns', campaignRoutes); 
app.use('/api/promotions', promotionsRoute);
app.use('/api/cart', cartRoutes);  // Cart route
app.use('/api/payment', paymentRoutes);







// Simple route to check if the API is working
app.get("/", (req, res) => {
    res.send("API Is Working");
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

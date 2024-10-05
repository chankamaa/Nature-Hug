import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import allUserDocRoutes from './routes/allUserDocRoutes.js';
import employeeRoutes from './routes/employeeRoutes.js';
import financeRoutes from './routes/financeRoutes.js';
import dotenv from 'dotenv'; // Import dotenv
dotenv.config(); // Load environment variables

// App Config
const app = express();
const port = 4000;

// Middleware
app.use(express.json());
app.use(cors());

// DB Connection
connectDB();

// Route Middlewares
app.use('/NatureHug/user', userRoutes);        // User routes
app.use('/NatureHug/documents', allUserDocRoutes);  // Document routes

// API Routes
app.use('/api/employees', employeeRoutes);     // Employee routes
app.use('/api/finance', financeRoutes);        // Finance routes

// Root route
app.get("/", (req, res) => {
    res.send("API is Working");
});

// Server Initialization
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

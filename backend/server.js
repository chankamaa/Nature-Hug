import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import employeeRoutes from './routes/employeeRoutes.js';
import financeRoutes from './routes/financeRoutes.js';
import plantRoutes from './routes/plantRoute.js';
import promotionsRoute from './routes/promotionsRoute.js';
import campaignRoutes from './routes/campaignRoute.js';

// App config
const app = express();
const port = 4000;

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
connectDB();

// API Routes
app.use('/api/employees', employeeRoutes); // Employee routes under /api/employees
app.use('/api/finance', financeRoutes); // Finance routes under /api/finance
app.use('/api/plants', plantRoutes); // Plant routes under /api/plants
app.use('/api/promotions', promotionsRoute); // Promotions routes under /api/promotions
app.use('/api', campaignRoutes);

// Static files (e.g., images)
app.use('/images', express.static('uploads'));

// Base route for testing
app.get('/', (req, res) => {
    res.send('API Is Working');
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import employeeRoutes from './routes/employeeRoutes.js';
import financeRoutes from './routes/financeRoutes.js';
import plantRoutes from './routes/plantRoute.js';
import cartRoutes from './routes/cartRoutes.js';  // Import cart routes

//app config
const app = express();
const port = 4000;

//middleware
app.use(express.json());
app.use(cors());

//db connection
connectDB();

//api routes
app.use('/api', employeeRoutes);
app.use("/api/plant", plantRoutes);
app.use("/images", express.static("uploads"));
app.use('/api', financeRoutes);
app.use('/api/cart', cartRoutes);  // Cart route

// Simple route to check if the API is working
app.get("/", (req, res) => {
    res.send("API Is Working");
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js';
import supplierRouter from './routes/supplierRouter.js'
import stockRouter from './routes/stockRouter.js'
import employeeRoutes from './routes/employeeRoutes.js';
import financeRoutes from './routes/financeRoutes.js';
import attendanceRoutes from './routes/attendanceRoutes.js';
import plantRoutes from './routes/plantRoute.js';
import emailRoutes from './routes/emailRoutes.js'; 



//app config
const app = express();
const port = 4000;


//middleware
app.use(express.json())
app.use(cors())


//db connection
connectDB();

//api routes

app.use('/api',supplierRouter);
app.use('/api',stockRouter);

//api routes

app.use('/api', employeeRoutes);
app.use("/api/plant",plantRoutes);
app.use("/images", express.static("uploads"));
app.use('/api',financeRoutes);
app.use('/api', attendanceRoutes);
app.use('/api', emailRoutes);




app.get("/",(req, res) =>{
    res.send("API Is Working")
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})
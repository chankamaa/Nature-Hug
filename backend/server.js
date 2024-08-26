import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js';
import employeeRoutes from './routes/employeeRoutes.js';
import financeRoutes from './routes/financeRoutes.js';



//app config
const app = express();
const port = 4000;


//middleware
app.use(express.json())
app.use(cors())



//db connection
connectDB();



//api routes
app.use('/api', employeeRoutes);
app.use('/api',financeRoutes);



app.get("/",(req, res) =>{
    res.send("API Is Working")
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})




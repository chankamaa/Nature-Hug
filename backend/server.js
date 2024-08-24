import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js';
import dotenv from 'dotenv'
dotenv.config()



//app config
const app = express();
const port = 4000;


//middleware
app.use(express.json())
app.use(cors())

//api endpoints
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);

//db connection
connectDB();

//routes
import userRoutes from "./routes/userRoutes.js"


//route middleware
app.use("/NatureHug/user", userRoutes)

app.get("/",(req, res) =>{
    res.send("API Is Working")
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})




import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js';
import supplierRouter from './Routers/supplierRouter.js'

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
app.use('/api', supplierRouter);



app.get("/",(req, res) =>{
    res.send("API Is Working")
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})




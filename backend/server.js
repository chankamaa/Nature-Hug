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

//routes
import userRoutes from './routes/userRoutes.js';
import allUserDoc from './routes/allUserDocRoutes.js';

//route middlewares
app.use(`/NatureHug/user`, userRoutes)
app.use('/NatureHug/documents', allUserDoc)




//api routes
app.use('/api', employeeRoutes);
app.use(financeRoutes);



app.get("/",(req, res) =>{
    res.send("API Is Working")
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})




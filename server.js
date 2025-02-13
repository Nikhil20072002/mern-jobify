import * as dotenv from "dotenv"
dotenv.config()
import express from "express";
const app = express();
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cloudinary from 'cloudinary'


//custom imports (imports from own files)
// import jobRouter from './routes/jobRouter.js'
import jobRouter from './routes/jobRouter.js'
import authRouter from './routes/authRoute.js'
import userRouter from './routes/userRouter.js'

import {dirname} from 'path'
import { fileURLToPath } from "url";
import path from "path";

import { authenticateUser } from "./middleware/authMiddleware.js";

// error middleware import
import errorMiddleware from './middleware/errorHandlerMiddleware.js'

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
  });

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

const __dirname=dirname(fileURLToPath(import.meta.url))
app.use(express.static(path.resolve(__dirname,'./client/dist')))


app.use(express.json());
app.use(cookieParser())

app.use('/api/v1/jobs',authenticateUser,jobRouter)
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/users',authenticateUser,userRouter)

app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'./client/dist','index.html'))
})

app.get('/api/v1/test',(req, res) => {
    res.json({ message: "Test route" })
})

// NOT FOUND MIDDLEWARE
app.use('*', (req, res) => {
    res.status(404).json({ message: "Not found" })
})
// ERROR MIDDLEWARE
app.use(errorMiddleware)

try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(5100, () => {
        console.log("Server is Up");
    })
} catch (error) {
    process.exit(1)
}


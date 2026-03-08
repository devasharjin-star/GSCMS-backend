import express from 'express';
import 'dotenv/config'
import cors from 'cors';
import connectToDb from './DB/config.js';
import authRoute from './routes/authroutes.js';
import cookieParser from 'cookie-parser';
import dns from 'dns';

dns.setServers(['8.8.8.8', '8.8.4.4']);
dns.setDefaultResultOrder('ipv4first');

const app=express()

connectToDb()

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth',authRoute)

const PORT=process.env.PORT

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})
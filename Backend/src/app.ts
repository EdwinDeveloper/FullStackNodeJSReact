import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import userRoute from './routes/userRoutes'

const app = express();


app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With', 'Accept'],
    credentials: true
  }));


app.use('/users', userRoute);

export default app;

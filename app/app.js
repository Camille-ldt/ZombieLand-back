import express from 'express';
import cors from 'cors';
//import router from './routers/main.js';

export const app = express();

app.use(cors({ origin: process.env.CORS }));

app.use(express.json());

//app.use(router);
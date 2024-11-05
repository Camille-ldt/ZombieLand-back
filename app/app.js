import express from 'express';
import cors from 'cors';
import { router } from './routers/indexRouter.js';
import passport from './services/passport.js';

export const app = express();

app.use(cors({ origin: process.env.CORS }));

app.use(express.json());

app.use(passport.initialize());

app.use(router);
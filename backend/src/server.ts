import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import authRouter from './routes/auth.js';
import campingsRouter from './routes/campings.js';
import affairesRouter from './routes/affaires.js';
import pointagesRouter from './routes/pointages.js';
import usersRouter from './routes/users.js';

export function createServer(){
  const app = express();
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(cookieParser());
  app.use(cors({
    origin: process.env.FRONT_ORIGIN || 'http://localhost:5173',
    credentials: true
  }));

  app.use('/api/auth', authRouter);
  app.use('/api/campings', campingsRouter);
  app.use('/api/affaires', affairesRouter);
  app.use('/api/pointages', pointagesRouter);
  app.use('/api/users', usersRouter);

  app.get('/api/health', (_req,res)=>res.json({ok:true}));
  return app;
}
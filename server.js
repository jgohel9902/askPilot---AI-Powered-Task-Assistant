import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import connectDB from './config/db.js';
import taskRoutes from './routes/taskRoutes.js';
import aiRoutes from './routes/aiRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (_req, res) => res.send('askPilot API is running'));
app.use('/api/tasks', taskRoutes);
app.use('/api/ai', aiRoutes);

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ MongoDB connected`);
      console.log(`🚀 API running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('DB connection failed:', err?.message || err);
    process.exit(1);
  });


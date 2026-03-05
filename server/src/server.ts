import express from 'express';
import authRoutes from './routes/authRoutes';
import dotenv from 'dotenv';
import { connectDB, disconnectDB } from './config/db';

dotenv.config();
connectDB();

const app = express();
const PORT = 5001;

// body parsing middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// api routes
app.use('/auth', authRoutes);

const server = app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});

process.on('unhandledRejection', (err: Error) => {
  console.error(`Unhandled Rejection: ${err.message}`);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

process.on('uncaughtException', (err: Error) => {
  console.error(`Uncaught Exception: ${err.message}`);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

process.on('SIGINT', async () => {
  console.log('SIGINT received, shutting down gracefully...');
  await disconnectDB();
  process.exit(0);
});

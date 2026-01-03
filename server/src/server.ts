
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db'; // Import the connection logic
import materialRoutes from './routes/materialRoutes';
import cors from 'cors'

// Load env vars
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

app.use('/api/material', materialRoutes);

// Vercel deployment config
if (process.env.VERCEL !== "true") {
  app.listen(port, () => { // Changed 2424 to port variable
    console.log(`Server is running on http://localhost:${port}`);
  });
}

export default app;
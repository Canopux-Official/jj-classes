import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db'; // Import the connection logic

// Load env vars
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware to parse JSON
app.use(express.json());

const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

// Vercel deployment config
if (process.env.VERCEL !== "true") {
  app.listen(port, () => { // Changed 2424 to port variable
    console.log(`Server is running on http://localhost:${port}`);
  });
}

module.exports = app;
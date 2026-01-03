import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db'; 

const port = process.env.PORT || 3000;
import authRoutes from './routes/auth/auth'; 
import adminStudentRoutes from './routes/admin/admin.student';
const corsOptions = {
  origin: `${process.env.CLIENT_LINK}`,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

connectDB();

app.use('/auth', authRoutes);
app.use('/admin', adminStudentRoutes);

if (process.env.VERCEL !== "true") {
  app.listen(port, () => { 
    console.log(`Server is running on http://localhost:${port}`);
  });
}

export default app;
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db'; 

const port = process.env.PORT || 3000;
import authRoutes from './routes/auth/auth'; 
import adminStudentRoutes from './routes/admin/admin.student';
import materialRoutes from './routes/materialRoutes';
import studentMaterialRoutes from './routes/student/studentMaterialRoutes'
import studentProfileRoutes from './routes/student/studentProfileRoutes'

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
app.use('/api/studentProfile', studentProfileRoutes);
app.use('/api/material', materialRoutes);
app.use('/api/student', studentMaterialRoutes);

// Vercel deployment config
if (process.env.VERCEL !== "true") {
  app.listen(port, () => { 
    console.log(`Server is running on http://localhost:${port}`);
  });
}

export default app;
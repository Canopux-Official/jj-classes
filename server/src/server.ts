import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db'; 

const port = process.env.PORT || 3000;
import authRoutes from './routes/auth/auth'; 
import adminStudentRoutes from './routes/admin/admin.student';
import adminStreamRoutes from './routes/admin/admin.stream';
import adminTargetExamRoutes from './routes/admin/admin.targetExam';
import adminSubjectRoutes from './routes/admin/admin.subject'
import materialRoutes from './routes/admin/admin.materialRoutes';
import studentMaterialRoutes from './routes/student/studentMaterialRoutes'
import studentProfileRoutes from './routes/student/studentProfileRoutes'
import adminNoticeRoutes from './routes/admin/admin.noticeRoutes'
import studentNoticeRoutes from './routes/student/studentNoticeRoutes'
import mongoose from 'mongoose';

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
app.use('/admin/studentControl', adminStudentRoutes);
app.use('/admin/streamControl', adminStreamRoutes);
app.use('/admin/targetExamControl', adminTargetExamRoutes);
app.use('/admin/subjectControl', adminSubjectRoutes);
app.use('/student/studentProfile', studentProfileRoutes);
app.use('/admin/material', materialRoutes);
app.use('/student/material', studentMaterialRoutes);
app.use('/admin/notice', adminNoticeRoutes);
app.use('/student/notice', studentNoticeRoutes);


// Vercel deployment config
if (process.env.VERCEL !== "true") {
  app.listen(port, () => { 
    console.log(`Server is running on http://localhost:${port}`);
  });
}

export default app;
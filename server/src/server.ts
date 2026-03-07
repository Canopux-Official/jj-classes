import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import connectDB from './config/db';
import authRoutes from './routes/auth/auth';
import adminStudentRoutes from './routes/admin/admin.student';
import adminStreamRoutes from './routes/admin/admin.stream';
import adminTargetExamRoutes from './routes/admin/admin.targetExam';
import adminSubjectRoutes from './routes/admin/admin.subject';
import materialRoutes from './routes/admin/admin.materialRoutes';
import studentMaterialRoutes from './routes/student/studentMaterialRoutes';
import studentProfileRoutes from './routes/student/studentProfileRoutes';
import adminNoticeRoutes from './routes/admin/admin.noticeRoutes';
import studentNoticeRoutes from './routes/student/studentNoticeRoutes';
import adminDashboardRoutes from './routes/admin/admin.dashboardRoutes';
import adminAttendanceRoutes from './routes/admin/admin.attendanceRoutes';
import adminControlRoutes from './routes/admin/admin.controlRoutes';
import studentAttendanceRoutes from './routes/student/student.attendanceRoutes';

import materialController from './controllers/materialcontroller';
import cron from 'node-cron';

const port = process.env.PORT || 3000;

const allowedOrigins = [
  process.env.CLIENT_LINK,
  "https://jj-classes.vercel.app",
  "http://localhost:5173"
].filter(Boolean) as string[];

const corsOptions = {
  origin: function (origin: any, callback: any) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed by origin"));
    }
  },
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
  credentials: true,
  optionsSuccessStatus: 200, 
};

const app = express();

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use('/auth', authRoutes);

// admin routes
app.use('/admin/dashboard', adminDashboardRoutes);
app.use('/admin/studentControl', adminStudentRoutes);
app.use('/admin/streamControl', adminStreamRoutes);
app.use('/admin/targetExamControl', adminTargetExamRoutes);
app.use('/admin/subjectControl', adminSubjectRoutes);
app.use('/admin/material', materialRoutes);
app.use('/admin/notice', adminNoticeRoutes);
app.use('/admin/attendance', adminAttendanceRoutes);
app.use('/admin/control', adminControlRoutes);

// student routes
app.use('/student/studentProfile', studentProfileRoutes);
app.use('/student/material', studentMaterialRoutes);
app.use('/student/notice', studentNoticeRoutes);
app.use('/student/attendance', studentAttendanceRoutes);

// Cron Jobs
cron.schedule('0 0 * * *', async () => {
  console.log('Running scheduled cleanup of inactive materials...');
  try {
    await materialController.cleanupInactiveMaterials();
    console.log('Cleanup completed successfully');
  } catch (error) {
    console.error('Error during scheduled cleanup:', error);
  }
});

console.log('Cron job for material cleanup has been scheduled');

if (process.env.VERCEL !== "true") {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

export default app;
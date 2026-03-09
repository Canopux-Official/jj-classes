import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

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
import cronRoutes from './routes/cronRoutes';
import adminLandingPageRoutes from './routes/admin/admin.landingPageRoutes';
import landingPageController from './controllers/landingPageController';

const port = process.env.PORT || 3000;
const app = express();

connectDB().catch((err) => {
  console.error("Initial Database Connection Error:", err);
});


app.use(helmet());

app.use(compression());

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests, please try again later." }
});

app.use(apiLimiter);

app.use(cors({ origin: process.env.CLIENT_LINK }));

app.use(express.urlencoded({ extended: true }));



// Landing page public route
app.get('/landingPage', (req: express.Request, res: express.Response) => {
  landingPageController.getLandingPage(req, res);
});

app.use('/auth', authRoutes);

// Admin routes
app.use('/admin/dashboard', adminDashboardRoutes);
app.use('/admin/studentControl', adminStudentRoutes);
app.use('/admin/streamControl', adminStreamRoutes);
app.use('/admin/targetExamControl', adminTargetExamRoutes);
app.use('/admin/subjectControl', adminSubjectRoutes);
app.use('/admin/material', materialRoutes);
app.use('/admin/notice', adminNoticeRoutes);
app.use('/admin/attendance', adminAttendanceRoutes);
app.use('/admin/control', adminControlRoutes);
app.use('/admin/landingPage', adminLandingPageRoutes);

// Student routes
app.use('/student/studentProfile', studentProfileRoutes);
app.use('/student/material', studentMaterialRoutes);
app.use('/student/notice', studentNoticeRoutes);
app.use('/student/attendance', studentAttendanceRoutes);

app.use('/api/cron', cronRoutes);


const startServer = () => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

if (process.env.VERCEL !== "true") {
  startServer();
}

export default app;
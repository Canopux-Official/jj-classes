import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

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

app.use(cors({ origin: process.env.CLIENT_LINK }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error("Database Connection Error:", err);
    res.status(500).json({ error: "Failed to connect to database" });
  }
});

// landing page public route
app.get('/landingPage', (req: express.Request, res: express.Response) => {
  landingPageController.getLandingPage(req, res);
});

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
app.use('/admin/landingPage', adminLandingPageRoutes);

// student routes
app.use('/student/studentProfile', studentProfileRoutes);
app.use('/student/material', studentMaterialRoutes);
app.use('/student/notice', studentNoticeRoutes);
app.use('/student/attendance', studentAttendanceRoutes);

// Cron Jobs
app.use('/api/cron', cronRoutes);
// cron.schedule('0 0 * * *', async () => {
//   console.log('Running automated material cleanup...');
//   try {
//     await materialcontroller.cleanupInactiveMaterials();
//   } catch (err) {
//     console.error('Cron Cleanup Error:', err);
//   }
// });

console.log('Cron job for material cleanup has been scheduled');

const startServer = () => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

// Vercel handles the "listen" internally, but Render/Local need it.
if (process.env.VERCEL !== "true") {
  startServer();
}

export default app;
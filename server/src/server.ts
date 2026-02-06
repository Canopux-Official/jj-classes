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
import adminDashboardRoutes from './routes/admin/admin.dashboardRoutes';

import materialController from './controllers/materialcontroller';
import cron from 'node-cron';


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

app.use('/admin/dashboard', adminDashboardRoutes);
app.use('/admin/studentControl', adminStudentRoutes);
app.use('/admin/streamControl', adminStreamRoutes);
app.use('/admin/targetExamControl', adminTargetExamRoutes);
app.use('/admin/subjectControl', adminSubjectRoutes);
app.use('/admin/material', materialRoutes);
app.use('/admin/notice', adminNoticeRoutes);

app.use('/student/studentProfile', studentProfileRoutes);
app.use('/student/material', studentMaterialRoutes);
app.use('/student/notice', studentNoticeRoutes);

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


// Vercel deployment config
if (process.env.VERCEL !== "true") {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}



export default app;
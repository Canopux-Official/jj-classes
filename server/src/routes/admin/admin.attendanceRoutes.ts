import express from 'express';
import { bulkSyncAttendance, getAdminAttendanceView } from '../../controllers/attendanceController';
import verifyAuth from '../../middlewares/verifyAuth';



const router = express.Router();

router.get("/view",verifyAuth,getAdminAttendanceView)
router.post("/sync",verifyAuth,bulkSyncAttendance)

export default router;
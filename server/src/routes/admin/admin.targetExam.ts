import express from 'express';
import { getAllExams, addExam, updateExam, deleteExam, getAllActiveExams } from '../../controllers/targetExamController';
import verifyAuth from '../../middlewares/verifyAuth';
const router = express.Router();

router.get('/all', verifyAuth, getAllExams);
router.post('/add', verifyAuth,addExam);
router.put('/update/:id', verifyAuth, updateExam);
router.delete('/delete/:id', verifyAuth, deleteExam);
router.get('/getActiveTargetExams', verifyAuth, getAllActiveExams);
export default router;
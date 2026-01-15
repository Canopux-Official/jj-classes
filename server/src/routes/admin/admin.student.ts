import express from 'express';
import { 
    getAllStudents, 
    addStudent, 
    updateStudent, 
    toggleStudentStatus, 
    bulkAddStudents, 
    deleteStudent
} from '../../controllers/studentController';
import { getAllSubjects } from '../../controllers/subjectController';
import verifyAuth from '../../middlewares/verifyAuth';

const router = express.Router();

router.get('/getAllStudents',  verifyAuth, getAllStudents);
router.post('/add',  verifyAuth, addStudent);
router.post('/bulk-add',  verifyAuth,  bulkAddStudents);
router.put('/update/:id',  verifyAuth, updateStudent);
router.put('/toggle-status/:id',  verifyAuth, toggleStudentStatus);
router.get('/getAllSubjects',  verifyAuth, getAllSubjects);
router.delete('/deleteStudent/:id',  verifyAuth, deleteStudent);

export default router;
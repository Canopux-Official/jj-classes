import express from 'express';
import { 
    getAllStudents, 
    addStudent, 
    updateStudent, 
    toggleStudentStatus, 
    bulkAddStudents, 
    deleteStudent, 
    getAllActiveStudents
} from '../../controllers/studentController';
import verifyAuth from '../../middlewares/verifyAuth';

const router = express.Router();

router.get('/getAllStudents',  verifyAuth, getAllStudents);
router.post('/add',  verifyAuth, addStudent);
router.post('/bulk-add',  verifyAuth,  bulkAddStudents);
router.put('/update/:id',  verifyAuth, updateStudent);
router.put('/toggle-status/:id',  verifyAuth, toggleStudentStatus);
router.delete('/deleteStudent/:id',  verifyAuth, deleteStudent);
router.get('/getAllActiveStudent', verifyAuth, getAllActiveStudents);

export default router;
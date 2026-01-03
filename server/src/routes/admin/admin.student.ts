import express from 'express';
import { 
    getAllStudents, 
    addStudent, 
    updateStudent, 
    toggleStudentStatus, 
    bulkAddStudents 
} from '../../controllers/studentController';



const router = express.Router();

router.get('/getAllStudents', getAllStudents);
router.post('/add', addStudent);
router.post('/bulk-add', bulkAddStudents);
router.put('/update/:id', updateStudent);
router.put('/toggle-status/:id', toggleStudentStatus);

export default router;
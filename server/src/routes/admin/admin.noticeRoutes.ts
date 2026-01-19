import express from 'express';
import noticeController from '../../controllers/noticeController';
import verifyAuth from '../../middlewares/verifyAuth';



const router = express.Router();

// Admin routes
router.post('/create', verifyAuth, noticeController.createNotice);
router.put('/edit/:id', verifyAuth, noticeController.editNotice);
router.delete('/delete/:id', verifyAuth, noticeController.deleteNotice);
router.get('/all', verifyAuth, noticeController.getAllNoticesAdmin);
router.get('/getById/:id', verifyAuth, noticeController.getNoticeById);

export default router
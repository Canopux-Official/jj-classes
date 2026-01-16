import express from 'express';
import { getAllStreams, addStream, updateStream, deleteStream, getAllActiveStreams } from '../../controllers/streamController';
import verifyAuth from '../../middlewares/verifyAuth';
const router = express.Router();

router.get('/all', verifyAuth, getAllStreams);
router.post('/add', verifyAuth, addStream);
router.put('/update/:id', verifyAuth, updateStream);
router.delete('/delete/:id', verifyAuth, deleteStream);
router.get('/getActiveStreams', verifyAuth, getAllActiveStreams);

export default router;
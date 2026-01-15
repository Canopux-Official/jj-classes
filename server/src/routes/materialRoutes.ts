import express from 'express';
import materialController from '../controllers/materialcontroller';
import verifyAuth from '../middlewares/verifyAuth';


const router = express.Router();


router.post('/create-class',verifyAuth, materialController.createClassId);
router.post('/create-sub-folder/:id',verifyAuth, materialController.createSubFolder);
router.get('/get-folders/:id',verifyAuth, materialController.findByParentId);
router.delete('/delete-sub-folder/:id',verifyAuth, materialController.deleteSubFolder);
router.patch('/update-sub-folder/:id',verifyAuth, materialController.updateSubFolder);
router.get('/get-all-classes',verifyAuth, materialController.getAllClasses);
router.post('/confirm-folder-deletion',verifyAuth, materialController.confirmFolderDeletion)
router.get('/files',verifyAuth, materialController.getAllFiles)


export default router;
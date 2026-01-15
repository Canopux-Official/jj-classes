import express from 'express';
import materialController from '../controllers/materialcontroller';


const router = express.Router();


router.post('/create-class', materialController.createClassId);
router.post('/create-sub-folder/:id', materialController.createSubFolder);
router.get('/get-folders/:id', materialController.findByParentId);
router.delete('/delete-sub-folder/:id', materialController.deleteSubFolder);
router.patch('/update-sub-folder/:id', materialController.updateSubFolder);
router.get('/get-all-classes', materialController.getAllClasses);
router.post('/confirm-folder-deletion', materialController.confirmFolderDeletion)
router.get('/files', materialController.getAllFiles)


export default router;
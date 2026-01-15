import express from 'express';
import StudentMaterial from '../../controllers/studentMaterialController';
import verifyAuth from '../../middlewares/verifyAuth';


const router = express.Router();
router.get("/getClasses",verifyAuth,StudentMaterial.showClass)
router.get("/getChild/:id",verifyAuth,StudentMaterial.findByParentId)


export default router;
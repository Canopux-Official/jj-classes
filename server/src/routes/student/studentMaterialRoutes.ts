import express from 'express';
import StudentMaterial from '../../controllers/studentMaterialController';


const router = express.Router();
router.post("/getClasses",StudentMaterial.showClass)
router.get("/getChild/:id",StudentMaterial.findByParentId)


export default router;
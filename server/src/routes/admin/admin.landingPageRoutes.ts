import express from 'express';
import verifyAuth from '../../middlewares/verifyAuth';
import landingPageController from '../../controllers/landingPageController';

const router = express.Router();

// Update landing page content (Admin)
router.post('/update', verifyAuth, landingPageController.updateLandingPage);

export default router;

import { getActiveStreamCount } from "../../controllers/streamController";
import { getActiveStudentCount } from "../../controllers/studentController";
import { getActiveSubjectCount } from "../../controllers/subjectController";
import { getActiveTargetExamCount } from "../../controllers/targetExamController";

import express, { Request, Response } from 'express';
import verifyAuth from '../../middlewares/verifyAuth';

const router = express.Router();

router.get('/getAdminDashboardDetails', verifyAuth, async (req: Request, res: Response): Promise<any> => {
    try {
        // Execute all count queries in parallel for better performance
        const [
            activeStudentCount,
            activeStreamCount,
            activeTargetExamCount,
            activeSubjectCount
        ] = await Promise.all([
            getActiveStudentCount(),
            getActiveStreamCount(),
            getActiveTargetExamCount(),
            getActiveSubjectCount()
        ]);

        return res.status(200).json({
            success: true,
            data: {
                studentCount: activeStudentCount,
                streamCount: activeStreamCount,
                targetExamCount: activeTargetExamCount,
                subjectCount: activeSubjectCount
            }
        });

    } catch (error) {
        console.error("Error fetching admin dashboard details:", error);
        return res.status(500).json({ 
            success: false, 
            message: "Internal Server Error",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
});

export default router;
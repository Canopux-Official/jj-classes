import express from 'express';
import jwt from 'jsonwebtoken';
import Student from '../../models/Student';
import Admin from '../../models/Admin';
// Added resendOtp to imports
import { sendOtp, verifyOtp, resendOtp } from '../../controllers/otpController';
import verifyAuth, { AuthRequest } from '../../middlewares/verifyAuth';

const router = express.Router();
const jwt_secret = process.env.JWT_SECRET;

router.post('/getLoggedInUser', async (req, res): Promise<any> => {
    const { name, dob, phoneNumber, currentClass, password } = req.body;

    if (!jwt_secret) {
        return res.status(500).json({ success: false, message: 'Server Config Error: JWT_SECRET missing error here' });
    }

    try {
        // admin login flow
        if (phoneNumber === process.env.ADMIN_PHONE) {
            const admin = await Admin.findOne({ phoneNumber });

            if (!admin) {
                return res.status(404).json({ success: false, message: 'Admin not found' });
            }

            if (admin.password != password) {
                return res.status(401).json({ success: false, message: 'Invalid password' });
            }
            const otpResponse = await sendOtp(admin.email, admin._id, 'admin');
            if (!otpResponse.success) {
                // Send the error message from the controller (e.g. "Email service auth failed") back to frontend
                return res.status(500).json(otpResponse);
            }

            return res.status(200).json({
                success: true,
                message: 'Credentials verified. OTP sent to email.',
                email: admin.email,
                authToken: null
            });

        }

        // student login flow
        const targetDob = dob ? new Date(dob) : null;
        const student = await Student.findOne({
            name: name,
            currentClass: currentClass,
            dob: targetDob,
            $or: [
                { phoneNumber: phoneNumber },
                { parentPhoneNumber: phoneNumber }
            ]
        });

        if (!student) {
            return res.status(404).json({
                success: false,
                message: 'Student not found. Please ensure Name, DOB, Class, and Phone Number match your records exactly.'
            });
        }

        if (student.password != password) {
            return res.status(401).json({ success: false, message: 'Invalid password' });
        }

        // Case A: No Email -> Immediate Login
        if (!student.email) {
            const authToken = jwt.sign(
                { id: student._id, role: "student", currentClass: student.currentClass },
                jwt_secret,
                { expiresIn: '30d' }
            );

            return res.status(200).json({
                success: true,
                message: 'Login Successful (No email linked)',
                email: null,
                authToken: authToken
            });
        }

        // Case B: Email Exists -> Require OTP
        const otpResponse = await sendOtp(student.email, student._id, "student");
        if (!otpResponse.success) {
            // Send the error message from the controller (e.g. "Email service auth failed") back to frontend
            return res.status(500).json(otpResponse);
        }

        return res.status(200).json({
            success: true,
            message: 'Credentials verified. OTP sent to email.',
            email: student.email,
            authToken: null
        });

    } catch (error) {
        console.error("Server Error:", error);
        return res.status(500).json({ success: false, message: 'Server Error', error });
    }
});

router.post('/resendOtp', async (req, res): Promise<any> => {
    const { email } = req.body;
    try {
        const result = await resendOtp(email);

        // If the controller returns a specific message indicating cooldown
        if (result.message && result.message.includes('Please wait')) {
            return res.status(429).json({ success: false, message: result.message });
        }

        if (result.message === "Failed to resend OTP") {
            return res.status(500).json({ success: false, message: result.message });
        }

        return res.status(200).json({ success: true, message: result.message });
    } catch (error) {
        console.error("Server Error:", error);
        return res.status(500).json({ success: false, message: 'Server Error', error });
    }
});

router.post('/verifyOtp', async (req, res): Promise<any> => {
    const { email, otp } = req.body;

    try {
        const result = await verifyOtp(email, otp);

        if (result.success) {
            // Determine if user is Admin or Student based on email lookup
            // (Or you could pass 'role' from frontend if you prefer explicit checks)
            let user: any = await Student.findOne({ email });
            let role = "student";

            if (!user) {
                user = await Admin.findOne({ email });
                role = "admin";
            }

            if (!user) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }

            const payload = role === "admin"
                ? { id: user._id, role: "admin" }
                : { id: user._id, role: "student", currentClass: user.currentClass };

            const authToken = jwt.sign(
                payload,
                jwt_secret as string,
                { expiresIn: '30d' }
            );

            return res.status(200).json({
                success: true,
                message: 'OTP verified successfully',
                email: user.email,
                authToken
            });
        }

        // Return error with attempts remaining if available
        return res.status(400).json({
            success: false,
            message: result.message,
            // @ts-ignore - Check if controller returns this property
            remainingAttempts: result.remainingAttempts
        });
    } catch (error) {
        console.error("Server Error:", error);
        return res.status(500).json({ success: false, message: 'Server Error', error });
    }
});

router.get('/verifyToken', verifyAuth, async (req: AuthRequest, res): Promise<any> => {
    try {
        const { id, role } = req.user!; // Extracted by middleware

        let userExists = null;

        // Check Database based on Role
        if (role === 'admin') {
            userExists = await Admin.findById(id).select('-password'); // Exclude password
        } else if (role === 'student') {
            userExists = await Student.findById(id).select('-password');
        }

        // If user was deleted from DB but still has a valid token
        if (!userExists) {
            return res.status(404).json({ success: false, message: 'User record not found. Please login again.' });
        }

        // Success: User is real and token is valid
        return res.status(200).json({ 
            success: true, 
            user: userExists,
            role: role 
        });

    } catch (error) {
        console.error("Token Verification Error:", error);
        return res.status(500).json({ success: false, message: 'Server Error during verification' });
    }
});

export default router;
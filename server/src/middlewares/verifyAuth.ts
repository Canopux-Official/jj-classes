import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Student from '../models/Student';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: 'student' | 'admin';
    currentClass?: string;
  };
}

const verifyAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {

  console.log('🔐 verifyAuth middleware triggered');

  const authHeader = req.headers.authorization;
  console.log('➡️ Authorization Header:', authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.warn('❌ No token or invalid format');
    res.status(401).json({ success: false, message: 'Access Denied: No Token Provided' });
    return;
  }

  const token = authHeader.split(' ')[1];
  console.log('🧾 Extracted Token:', token);

  try {
    if (!process.env.JWT_SECRET) {
      console.error('❌ JWT_SECRET missing in environment variables');
      throw new Error('Server Config Error: JWT_SECRET missing');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as AuthRequest['user'];
    console.log('✅ Token Decoded:', decoded);

    if (decoded.role === 'student') {
      console.log('🎓 User is a student, checking active status');

      const student = await Student.findById(decoded.id).select('isActive');
      console.log('📘 Student DB Result:', student);

      if (!student) {
        console.warn('❌ Student not found in DB');
        res.status(404).json({ success: false, message: 'Student not found' });
        return;
      }

      if (student.isActive === false) {
        console.warn('⛔ Student account is deactivated');

        res.status(403).json({
          success: false,
          message: 'Access Denied: Your account has been deactivated. Please contact the administrator.'
        });
        return;
      }
    }

    req.user = decoded;
    console.log('✅ Auth successful, user attached to request:', req.user);

    next();
  } catch (error) {
    console.error('❌ Auth Error:', error);
    res.status(401).json({ success: false, message: 'Invalid or Expired Token' });
  }
};

export default verifyAuth;

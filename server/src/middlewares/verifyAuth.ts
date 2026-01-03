import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extend the Express Request type to include our user data
export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: 'student' | 'admin';
    currentClass?: string;
  };
}

const verifyAuth = (req: AuthRequest, res: Response, next: NextFunction): void => {
  // 1. Get Token
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ success: false, message: 'Access Denied: No Token Provided' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    // 2. Verify Signature
    if (!process.env.JWT_SECRET) {
      throw new Error('Server Config Error: JWT_SECRET missing');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as AuthRequest['user'];
    
    // 3. Attach user to request object
    req.user = decoded;
    
    next(); // Move to the actual route handler
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid or Expired Token' });
  }
};

export default verifyAuth;
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: 'student' | 'admin';
    currentClass?: string;
  };
}

const verifyAuth = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ success: false, message: 'Access Denied: No Token Provided' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error('Server Config Error: JWT_SECRET missing');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as AuthRequest['user'];
    
    req.user = decoded;
    
    next(); 
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid or Expired Token' });
  }
};

export default verifyAuth;
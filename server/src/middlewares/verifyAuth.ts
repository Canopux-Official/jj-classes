import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import Student from '../models/Student';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: 'student' | 'admin' | 'superadmin';
    currentClass?: string;
  };
}

const verifyAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {

  console.log("======================================");
  console.log("🔐 verifyAuth MIDDLEWARE STARTED");
  console.log("🕒 Time:", new Date().toISOString());
  console.log("➡️ Request Method:", req.method);
  console.log("➡️ Request URL:", req.originalUrl);

  try {

    console.log("📦 Incoming Headers:", req.headers);

    const authHeader = req.headers.authorization;
    console.log("➡️ Authorization Header:", authHeader);

    if (!authHeader) {
      console.warn("❌ Authorization header missing");
      res.status(401).json({
        success: false,
        message: "Access Denied: No Authorization Header"
      });
      return;
    }

    if (!authHeader.startsWith("Bearer ")) {
      console.warn("❌ Authorization header does not start with Bearer");
      res.status(401).json({
        success: false,
        message: "Access Denied: Invalid Token Format"
      });
      return;
    }

    console.log("✅ Bearer format confirmed");

    const token = authHeader.split(" ")[1];

    console.log("🧾 Extracted Token:");
    console.log(token);

    if (!token) {
      console.warn("❌ Token extraction failed");
      res.status(401).json({
        success: false,
        message: "Access Denied: Token Missing"
      });
      return;
    }

    console.log("🔑 JWT_SECRET present:", !!process.env.JWT_SECRET);

    if (!process.env.JWT_SECRET) {
      console.error("❌ JWT_SECRET not defined in env");
      throw new Error("JWT_SECRET missing");
    }

    console.log("🔍 Verifying JWT token...");

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    ) as AuthRequest["user"];

    console.log("✅ Token successfully verified");
    console.log("📜 Decoded Payload:", decoded);

    if (!decoded) {
      console.warn("❌ Decoded token empty");
      res.status(401).json({
        success: false,
        message: "Invalid Token"
      });
      return;
    }

    console.log("👤 User ID from token:", decoded.id);
    console.log("👤 User Role:", decoded.role);

    if (decoded.role === "student") {

      console.log("🎓 Role is student → checking DB");

      console.log("🔎 Querying Student collection with ID:", decoded.id);

      const student = await Student.findById(decoded.id).select("isActive");

      console.log("📘 DB Response:", student);

      if (!student) {
        console.warn("❌ Student not found in database");

        res.status(401).json({
          success: false,
          message: "Session expired. Please login again."
        });

        return;
      }

      console.log("🟢 Student found in DB");

      console.log("📊 Student Active Status:", student.isActive);

      if (student.isActive === false) {

        console.warn("⛔ Student account is deactivated");

        res.status(403).json({
          success: false,
          message:
            "Access Denied: Your account has been deactivated. Contact admin."
        });

        return;
      }

      console.log("✅ Student account is active");
    }

    console.log("📎 Attaching user to request");

    req.user = decoded;

    console.log("🧾 req.user =", req.user);

    console.log("🚀 Passing control to next middleware");

    next();

  } catch (error) {

    console.error("❌ ERROR IN AUTH MIDDLEWARE");
    console.error("Error object:", error);

    res.status(401).json({
      success: false,
      message: "Invalid or Expired Token"
    });

  }

  console.log("🔚 verifyAuth MIDDLEWARE END");
  console.log("======================================");
};

export default verifyAuth;
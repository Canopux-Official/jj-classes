import { Request, Response } from 'express';
import Student from "../models/Student";
import Subject from "../models/Subject";
import bcrypt from 'bcryptjs';

// Helper to hash passwords
const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, 10);
};

// Helper to map Subject Names -> ObjectIds
const getSubjectIds = async (subjectInput: string | string[]) => {
    if (!subjectInput) return [];
    
    // If it's a string "Physics,Maths", split it. If it's already an array, use it.
    const names = Array.isArray(subjectInput) ? subjectInput : String(subjectInput).split(',');
    
    if (names.length === 0) return [];

    // Find all subjects that match these names
    const subjects = await Subject.find({ name: { $in: names } });
    
    // Return just the _id array
    return subjects.map(s => s._id);
};

// --- READ ---
export const getAllStudents = async (req: Request, res: Response) => {
    try {
        const students = await Student.find({})
            .populate({
                path: 'enrolledSubjects',
                model: Subject,
                select: 'name stream'
            })
            .select('-password -createdAt -updatedAt') // Exclude password
            .sort({ admissionDate: -1 });

        res.status(200).json(students);
    } catch (error) {
        console.error("Error fetching students:", error);
        res.status(500).json({ message: 'Error fetching students' });
    }
}

export const getStudentById = async (req: Request, res: Response) => {
    try {
        const student = await Student.findById(req.params.id).populate('enrolledSubjects', 'name stream');
        if (!student) return res.status(404).json({ message: 'Student not found' });
        res.status(200).json(student);
    } catch {
        res.status(500).json({ message: 'Error fetching student details' });
    }
}

// --- CREATE ---
export const addStudent = async (req: Request, res: Response) => {
  try {
    let students = [];
    if (req.body.students && Array.isArray(req.body.students)) {
      students = req.body.students;
    } else if (req.body.name || req.body.phoneNumber) {
      students = [req.body];
    } else {
      return res.status(400).json({ message: "Invalid data: No student data found." });
    }
    
    const addedStudents = [];
    const failedStudents = [];

    for (const student of students) {
      const { name, phoneNumber, dob, email, stream } = student;
      
      const currentClass = student.currentClass || student.studentClass || student.class || student.standard;
      
      // UPDATED: No default value, now compulsory
      const academicSession = student.academicSession; 
      
      const targetExams = student.targetExams || [];
      
      const missingFields = [];
      if (!name) missingFields.push('name');
      if (!phoneNumber) missingFields.push('phoneNumber');
      if (!dob) missingFields.push('dob');
      if (!currentClass) missingFields.push('currentClass');
      
      // UPDATED: Added check for academicSession
      if (!academicSession) missingFields.push('academicSession');
      
      if (!targetExams || targetExams.length === 0) missingFields.push('targetExams');
      
      if (missingFields.length > 0) {
         failedStudents.push({ 
             name: name || 'Unknown', 
             phoneNumber: phoneNumber || 'N/A', 
             reason: `Missing required fields: ${missingFields.join(', ')}` 
         });
         continue; 
      }
      
      const dobDate = new Date(dob);
      if (isNaN(dobDate.getTime())) {
          failedStudents.push({ name, phoneNumber, reason: "Invalid Date of Birth format" });
          continue;
      }

      let subjectIds = [];
      try {
        subjectIds = await getSubjectIds(student.enrolledSubjects);
      } catch (err) {
        console.error("Subject lookup failed", err);
      }

      const hashedPassword = await hashPassword(phoneNumber);

      const existingStudent = await Student.findOne({
        name: name,
        phoneNumber: phoneNumber,
        currentClass: currentClass,
        dob: dobDate 
      });

      if (existingStudent) {
        failedStudents.push({
          name,
          phoneNumber,
          reason: "Duplicate: Name, Phone, Class & DOB match an existing student."
        });
      } else {
        try {
            const newStudent = await Student.create({
              name,
              phoneNumber,
              dob: dobDate,
              currentClass,
              academicSession,
              password: hashedPassword, 
              targetExams, 
              enrolledSubjects: subjectIds, 
              email: email || 'N/A', 
              stream: stream || 'N/A',
              parentPhoneNumber: student.parentPhoneNumber || undefined,
              isActive: true,
              admissionDate: new Date()
            });
            
            addedStudents.push(newStudent);
        } catch (createError: any) {
            failedStudents.push({
                name,
                phoneNumber,
                reason: createError.message.includes('E11000') 
                    ? "Phone number or Email already exists in system (Unique Constraint)." 
                    : `Database Error: ${createError.message}`
            });
        }
      }
    }

    return res.status(200).json({
      message: "Process completed",
      addedCount: addedStudents.length,
      failedCount: failedStudents.length,
      addedStudents,
      failedStudents,
    });

  } catch (error) {
    console.error("Error in addStudent controller:", error);
    return res.status(500).json({ 
        message: "Server error", 
        error: error instanceof Error ? error.message : "Unknown error" 
    });
  }
};

export const updateStudent = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        if (updates.enrolledSubjects && Array.isArray(updates.enrolledSubjects)) {
            const isName = typeof updates.enrolledSubjects[0] === 'string' && !updates.enrolledSubjects[0].match(/^[0-9a-fA-F]{24}$/);
            if (isName) {
                updates.enrolledSubjects = await getSubjectIds(updates.enrolledSubjects);
            }
        }

        const updatedStudent = await Student.findByIdAndUpdate(id, updates, { new: true })
            .populate('enrolledSubjects', 'name');

        if (!updatedStudent) return res.status(404).json({ message: "Student not found" });

        res.status(200).json({ success: true, message: "Student updated", student: updatedStudent });
    } catch (error) {
        res.status(500).json({ message: 'Error updating student' });
    }
}

// --- DELETE (Soft Delete) ---
export const toggleStudentStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const student = await Student.findById(id);
        
        if (!student) return res.status(404).json({ message: "Student not found" });

        // Toggle Status
        student.isActive = !student.isActive;
        await student.save();

        res.status(200).json({ success: true, message: `Student marked as ${student.isActive ? 'Active' : 'Inactive'}` });
    } catch (error) {
        res.status(500).json({ message: 'Error updating status' });
    }
}

// --- BULK IMPORT ---

export const bulkAddStudents = async (req: Request, res: Response) => {
  try {
    const { students } = req.body;
    
    if (!Array.isArray(students) || students.length === 0) {
      return res.status(400).json({ message: "Invalid data format: 'students' array is required." });
    }

    const addedStudents = [];
    const failedStudents = [];

    for (const s of students) {
      try {
        // --- 1. Safe Type Conversion & Sanitization ---
        
        const name = s.name ? String(s.name).trim() : "";
        const phoneNumber = s.phoneNumber ? String(s.phoneNumber).trim() : "";
        const email = s.email ? String(s.email).trim() : "";
        const dobRaw = s.dob; 
        
        // Handle Class Aliases
        const rawClass = s.currentClass || s.studentClass || s.class || s.standard;
        const currentClass = rawClass ? String(rawClass).trim() : "";
        
        // UPDATED: No default value for academicSession
        const academicSession = s.academicSession ? String(s.academicSession).trim() : "";
        
        const stream = s.stream ? String(s.stream).trim() : 'N/A';
        const parentPhoneNumber = s.parentPhoneNumber ? String(s.parentPhoneNumber).trim() : undefined;

        // Handle Target Exams
        let targetExams: string[] = [];
        if (typeof s.targetExams === 'string') {
            targetExams = s.targetExams.split(/[|,]/).map((t: string) => t.trim()).filter((t: string) => t);
        } else if (Array.isArray(s.targetExams)) {
            targetExams = s.targetExams;
        }

        // --- 2. Validation ---
        const missingFields = [];
        if (!name) missingFields.push('name');
        if (!phoneNumber) missingFields.push('phoneNumber');
        if (!dobRaw) missingFields.push('dob');
        if (!currentClass) missingFields.push('currentClass');
        
        // UPDATED: Added check for academicSession
        if (!academicSession) missingFields.push('academicSession');
        
        if (targetExams.length === 0) missingFields.push('targetExams');

        if (missingFields.length > 0) {
            throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
        }

        // --- 3. Date Parsing ---
        const dobDate = new Date(dobRaw);
        if (isNaN(dobDate.getTime())) {
            throw new Error("Invalid Date of Birth format");
        }

        // --- 4. Subject Lookup ---
        let subjectInput = s.enrolledSubjects;
        if (typeof subjectInput === 'string') {
            subjectInput = subjectInput.split(/[|,]/).map((sub: string) => sub.trim());
        }
        
        let subjectIds = [];
        try {
            subjectIds = await getSubjectIds(subjectInput || []);
        } catch (err) {
            console.error(`Subject lookup warning for ${name}:`, err);
        }

        // --- 5. Password Hashing ---
        const hashedPassword = await hashPassword(phoneNumber);

        // --- 6. Duplicate Check (Manual) ---
        const existingStudent = await Student.findOne({
            name: name,
            phoneNumber: phoneNumber,
            currentClass: currentClass,
            dob: dobDate
        });

        if (existingStudent) {
            throw new Error("Duplicate: Name, Phone, Class & DOB match an existing student.");
        }

        // --- 7. Database Creation ---
        const newStudent = await Student.create({
            name,
            phoneNumber,
            dob: dobDate,
            currentClass,
            academicSession,
            password: hashedPassword,
            targetExams,
            enrolledSubjects: subjectIds,
            email: email || 'N/A',
            stream: stream,
            parentPhoneNumber,
            isActive: true,
            admissionDate: new Date()
        });

        addedStudents.push(newStudent);

      } catch (err: any) {
        // --- Error Handling for Row ---
        let reason = err.message;
        if (err.message && err.message.includes('E11000')) {
            reason = "Phone number or Email already exists in system (Unique Constraint).";
        }

        failedStudents.push({
            name: s.name || 'Unknown',
            phoneNumber: s.phoneNumber || 'N/A',
            reason: reason
        });
      }
    }

    // --- Final Response ---
    return res.status(200).json({
        message: "Process completed",
        addedCount: addedStudents.length,
        failedCount: failedStudents.length,
        addedStudents,
        failedStudents,
    });

  } catch (error: any) {
    console.error("Error in bulkAddStudents controller:", error);
    return res.status(500).json({ 
        message: "Server error", 
        error: error.message || "Unknown error" 
    });
  }
};
import { Request, Response } from 'express';
import Student from "../models/Student";
import Subject from "../models/Subject";
import bcrypt from 'bcryptjs';

// Helper to hash passwords
const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, 10);
};

// Helper to map Subject Names -> ObjectIds
const getSubjectIds = async (subjectNames: string[]) => {
    if (!subjectNames || subjectNames.length === 0) return [];
    const subjects = await Subject.find({ name: { $in: subjectNames } });
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
export const addStudent = async (req, res) => {
  try {
    const { students } = req.body; // Expecting an array of student objects
    
    const addedStudents = [];
    const failedStudents = [];

    // Loop through each student in the request
    for (const student of students) {
      const { name, phoneNumber, dob, studentClass } = student; // Assuming 'studentClass' or 'class'

      // 1. CHECK: Do we have an exact match on ALL 4 fields?
      const existingStudent = await Student.findOne({
        name: name,
        phoneNumber: phoneNumber,
        dob: dob,
        class: studentClass 
      });

      if (existingStudent) {
        // 2. FAIL: If all 4 match, skip and add to failed list
        failedStudents.push({
          name,
          phoneNumber,
          reason: "Duplicate entry: Name, Phone, DOB, and Class already exist."
        });
      } else {
        // 3. SUCCESS: No exact match found, create the student
        const newStudent = await Student.create(student);
        addedStudents.push(newStudent);
      }
    }

    // 4. RESPONSE: Send back both lists so the frontend can display them
    return res.status(200).json({
      message: "Process completed",
      addedCount: addedStudents.length,
      failedCount: failedStudents.length,
      addedStudents,
      failedStudents, // Frontend can loop through this to show toast/alert
    });

  } catch (error) {
    console.error("Error adding students:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// --- UPDATE ---
export const updateStudent = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        // If updating subjects, resolve names to IDs again
        if (updates.enrolledSubjects && Array.isArray(updates.enrolledSubjects)) {
            // Check if they are already IDs or Names
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
            return res.status(400).json({ message: "Invalid data format" });
        }

        let successCount = 0;
        let failCount = 0;

        for (const s of students) {
            try {
                // 1. Safe Type Conversion (Excel Protection)
                const phoneStr = s.phoneNumber ? String(s.phoneNumber).trim() : "";
                if(!phoneStr) { failCount++; continue; } // Skip if no phone

                // Quick duplicate check
                const exists = await Student.findOne({ phoneNumber: phoneStr });
                if (exists) { failCount++; continue; }

                // 2. Hash Password (must be string)
                const hashedPassword = await hashPassword(phoneStr);

                // 3. Handle Pipe/Comma Split safely
                // String(...) ensures .split() never crashes even if value is null/number
                const enrolledSubjectsRaw = s.enrolledSubjects ? String(s.enrolledSubjects) : "";
                const subjectIds = await getSubjectIds(enrolledSubjectsRaw.split(/[|,]/));

                const targetExamsRaw = s.targetExams ? String(s.targetExams) : "";

                await Student.create({
                    ...s,
                    phoneNumber: phoneStr,
                    parentPhoneNumber: s.parentPhoneNumber ? String(s.parentPhoneNumber) : "",
                    enrolledSubjects: subjectIds,
                    password: hashedPassword,
                    email: s.email || `${phoneStr}@jjclasses.com`,
                    dob: s.dob ? new Date(s.dob) : new Date(),
                    targetExams: targetExamsRaw.split(/[|,]/)
                });
                successCount++;
            } catch (err) {
                console.error("Bulk Import Row Error:", err);
                failCount++;
            }
        }

        res.status(200).json({ 
            success: true, 
            message: `Import complete. Success: ${successCount}, Failed: ${failCount}` 
        });

    } catch (error) {
        res.status(500).json({ message: "Bulk import failed" });
    }
}
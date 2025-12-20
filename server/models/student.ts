import mongoose, { Schema, Document } from 'mongoose';

export interface IStudent extends Document {
  name: string;
  phoneNumber: string;
  parentPhoneNumber?: string;
  currentClass: string;
  stream?: string;
  targetExams: string[];
  enrolledSubjects: mongoose.Types.ObjectId[];
  academicSession: string;
  admissionDate: Date;
  isActive: boolean;
}

const StudentSchema: Schema = new Schema({
  // Basic Identity
  name: { 
    type: String, 
    required: true,
    // Comment: Full legal name of the student for records.
  },

  // Authentication Key
  phoneNumber: { 
    type: String, 
    required: true, 
    unique: true, 
    index: true,
    // Comment: This is the PRIMARY USERNAME. Used to send OTP and identify the user during login. 
    // Must be unique across the entire database.
  },

  parentPhoneNumber: { 
    type: String,
    // Comment: Stored for emergency contact or sending performance reports/absenteeism alerts.
  },

  // Academic Standing
  currentClass: { 
    type: String, 
    required: true,
    // Comment: Defines the primary bucket for content (e.g., "9", "10", "11", "12"). 
    // A Class 11 student will never see Class 12 content.
  },

  stream: { 
    type: String,
    // Comment: Relevant for 11th/12th (e.g., "Science", "Commerce"). 
    // Can be 'N/A' for 9th/10th. Helps in filtering subjects.
  },

  // *** CRITICAL ACCESS CONTROL ***
  targetExams: {
    type: [String],
    enum: ['JEE', 'NEET', 'Boards'],
    default: [],
    // Comment: The specific goals of the student. 
    // If a student has ['JEE'], they will see content tagged 'JEE'.
    // If they have ['JEE', 'Boards'], they see both. 
    // If empty, they might only see general content.
  },

  // Granular Access
  enrolledSubjects: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Subject',
    // Comment: Array of Subject IDs (e.g., Physics ID, Math ID). 
    // Allows you to restrict a student who hasn't paid for "Math" from seeing Math content, 
    // even if they are in the correct class.
  }], 

  // Administrative
  academicSession: { 
    type: String, 
    required: true,
    // Comment: The year they belong to (e.g., "2024-2025"). 
    // Essential for promoting students or archiving old batches.
  },

  admissionDate: { 
    type: Date, 
    default: Date.now,
    // Comment: Tracks when they joined. Useful for calculating pro-rata fees if needed later.
  },

  isActive: { 
    type: Boolean, 
    default: true,
    // Comment: "Soft Delete" flag. If a student leaves mid-session, set this to false. 
    // They can no longer log in, but their data remains for analytics.
  },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt

export default mongoose.model<IStudent>('Student', StudentSchema);
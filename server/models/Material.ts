import mongoose, { Schema, Document } from 'mongoose';

export interface IMaterial extends Document {
  title: string;
  description?: string;
  driveLink: string;
  category: 'Notes' | 'Assignment' | 'Test Paper' | 'Other';
  subject: string;
  targetClass: string;
  examTags: string[];
  uploadedAt: Date;
}

const MaterialSchema: Schema = new Schema({
  // Display Info
  title: { 
    type: String, 
    required: true,
    // Comment: The name displayed to the student (e.g., "Electrostatics Sheet 1").
  },

  description: { 
    type: String,
    // Comment: Optional extra details (e.g., "Submit by Monday", "Chapter 1 summary").
  },

  // The Content
  driveLink: { 
    type: String, 
    required: true,
    // Comment: The direct URL to the PDF/Video on Google Drive. 
    // Frontend will open this link in a new tab.
  },

  // Organization
  category: { 
    type: String, 
    required: true, 
    enum: ['Notes', 'Assignment', 'Test Paper', 'Other'],
    // Comment: Used for tabs/filters on the frontend (e.g., "Show me only Assignments").
  },

  subject: { 
    type: String, 
    required: true,
    // Comment: The subject name (e.g., "Physics"). 
    // Should match a name in the Subject collection.
  },

  // *** ACCESS MATCHING ***
  targetClass: { 
    type: String, 
    required: true,
    // Comment: Level 1 filter. Matches Student.currentClass.
  },

  examTags: {
    type: [String],
    enum: ['JEE', 'NEET', 'Boards'],
    required: true,
    // Comment: Level 2 filter. Matches Student.targetExams.
    // Example: A file tagged ['JEE'] is hidden from a student with only ['NEET'].
    // A file tagged ['JEE', 'NEET'] is visible to both.
  },

  uploadedAt: { 
    type: Date, 
    default: Date.now,
    // Comment: Used to sort materials by "Newest First" on the dashboard.
  },
});

export default mongoose.model<IMaterial>('Material', MaterialSchema);
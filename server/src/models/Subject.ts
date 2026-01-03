import mongoose, { Schema, Document } from 'mongoose';

export interface ISubject extends Document {
  name: string;
  stream?: string;
  isActive: boolean;
}

const SubjectSchema: Schema = new Schema({
  name: { 
    type: String, 
    required: true, 
    unique: true,
    // Comment: The subject name (e.g., "Physics", "Chemistry").
  },

  stream: { 
    type: String,
    // Comment: Helps categorize subjects in the dropdown (e.g., "Science" vs "Arts").
  },

  isActive: { 
    type: Boolean, 
    default: true,
    // Comment: If you stop teaching a subject, set this to false to hide it from the "Add Material" dropdowns.
  },
}, { timestamps: true });

export default mongoose.model<ISubject>('Subject', SubjectSchema);
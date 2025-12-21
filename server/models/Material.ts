import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IMaterial extends Document {
  // Display Info
  heading: string;
  title: string;
  description?: string;
  
  // File Information
  fileUploadLinks: string[];
  referenceLinks: string[];
  driveLink: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  
  // Organization & Categorization
  category: 'Notes' | 'Assignment' | 'Test Paper' | 'Other';
  subject: string;
  tags: string[];
  
  // Access Control
  stream: string;
  class: 'Class 9' | 'Class 10' | 'Class 11' | 'Class 12' | 'JEE Mains' | 'JEE Advanced';
  
  // Status & Workflow
  status: 'Pending' | 'Completed' | 'Graded';
  approvalStatus: 'Pending' | 'Approved' | 'Rejected';
  priority: 'High' | 'Medium' | 'Low';
  
  // Dates & Deadlines
  lastDate?: Date;
  uploadedAt: Date;
  createdAt: Date;
  
  
  // Additional Features
  version: number;
  notificationSent: boolean;
  isEncrypted: boolean;
  
  // Hierarchy
  parentId?: Types.ObjectId;
}

const MaterialSchema: Schema = new Schema({
  // Display Info
  heading: { 
    type: String, 
    required: true,
    // Comment: The main heading for the section/material
  },

  title: { 
    type: String, 
    required: true,
    // Comment: The name displayed to the student (e.g., "Electrostatics Sheet 1")
  },

  description: { 
    type: String,
    default: null,
    // Comment: Optional extra details (e.g., "Submit by Monday", "Chapter 1 summary")
  },

  // File Information
  fileUploadLinks: {
    type: [String],
    default: [],
    // Comment: Array of file links - supports multiple files per section
  },

  referenceLinks: {
    type: [String],
    default: [],
    // Comment: Links to external resources or references
  },

  driveLink: { 
    type: String, 
    required: true,
    // Comment: The direct URL to the PDF/Video on Google Drive
  },

  fileName: {
    type: String,
    required: true,
    // Comment: Original name of the uploaded file
  },

  fileType: {
    type: String,
    required: true,
    // Comment: File type (PDF, Image, Video, etc.)
  },

  fileSize: {
    type: Number,
    required: true,
    // Comment: Size of the file in bytes
  },

  // Organization & Categorization
  category: { 
    type: String, 
    required: true, 
    enum: ['Notes', 'Assignment', 'Test Paper', 'Other'],
    // Comment: Used for tabs/filters on the frontend
  },

  subject: { 
    type: String, 
    required: true,
    // Comment: The subject name (e.g., "Physics")
  },

  tags: {
    type: [String],
    default: [],
    // Comment: Additional tags for categorization and search
  },

  // Access Control
  stream: { 
    type: String, 
    required: true,
    // Comment: Level 1 filter. Matches Student.currentClass
  },

  class: {
    type: String,
    enum: ['Class 9', 'Class 10', 'Class 11', 'Class 12', 'JEE Mains', 'JEE Advanced'],
    required: true,
    // Comment: Specifies the grade level for the material
  },

  visibility: {
    type: String,
    enum: ['Public', 'Private', 'Restricted'],
    default: 'Private',
    // Comment: Controls who can access this material
  },

  // Status & Workflow
  status: {
    type: String,
    enum: ['Pending', 'Completed', 'Graded'],
    default: 'Pending',
    // Comment: Current status of the material/assignment
  },

  approvalStatus: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending',
    // Comment: Admin approval status for the material
  },

  priority: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
    default: 'Medium',
    // Comment: Priority level for assignments/tasks
  },

  // Dates & Deadlines
  lastDate: {
    type: Date,
    default: null,
    // Comment: Last date of submission/completion
  },

  uploadedAt: { 
    type: Date, 
    default: Date.now,
    // Comment: Used to sort materials by "Newest First"
  },

  createdAt: {
    type: Date,
    default: Date.now,
    // Comment: Timestamp of when the document was created
  },

  // User Information
  uploadedBy: {
    type: String,
    required: true,
    // Comment: Name or ID of the uploader
  },

  notificationSent: {
    type: Boolean,
    default: false,
    // Comment: Flag to track if notification was sent to students
  },

  isEncrypted: {
    type: Boolean,
    default: false,
    // Comment: Whether the file is encrypted
  },

  // Hierarchy
  parentId: {
    type: Schema.Types.ObjectId,
    ref: 'Material',
    default: null,
    // Comment: Reference to parent document for hierarchical structure
  },
});

export default mongoose.model<IMaterial>('Material', MaterialSchema);
import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IFileDetail {
  fileName: string;
  uploadLink: string;
  fileId?: string;
}

export interface IReferenceDetail {
  fileName: string;
  uploadLink: string;
}

export interface IMaterial extends Document {
  heading: string;
  description?: string;
  fileDetails: IFileDetail[];
  referenceDetails: IReferenceDetail[];
  type: string;
  tags: string[];

  // Access Control
  class: '9' | '10' | '11' | '12' | 'dropper-1' | 'dropper-2' | '';
  targetExam: mongoose.Types.ObjectId; // Reference
  stream: mongoose.Types.ObjectId;     // Reference

  lastDate?: Date;
  createdAt: Date;
  parentId?: Types.ObjectId;
}

const MaterialSchema: Schema = new Schema({
  heading: { type: String, required: true },
  description: { type: String, default: null, required: false },
  
  fileDetails: [{
    fileName: { type: String, required: false },
    uploadLink: { type: String, required: false },
    fileId: { type: String, required: false }
  }],

  referenceDetails: [{
    fileName: { type: String, required: false },
    referenceLink: { type: String, required: false }
  }],

  type: { type: String, default: 'folder' },
  tags: { type: [String], default: [], required: false },

  // Access Control
  stream: { 
    type: Schema.Types.ObjectId, 
    ref: 'Stream',
    required: false,
    default: null
  },
  
  class: {
    type: String,
    enum: ['9', '10', '11', '12', 'dropper-1', 'dropper-2', ''],
    required: false,
    default: ''
  },

  targetExam:{
    type: Schema.Types.ObjectId,
    ref: 'TargetExam',
    required: false,
    default: null
  },

  lastDate: { type: Date, default: null, required: false },
  createdAt: { type: Date, default: Date.now, required: false },
  
  parentId: {
    type: Schema.Types.ObjectId,
    ref: 'Material',
    default: null,
    required: false
  },
}, { timestamps: true });

export default mongoose.model<IMaterial>('Material', MaterialSchema);
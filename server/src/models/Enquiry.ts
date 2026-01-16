import mongoose, { Schema, Document } from 'mongoose';

export interface IEnquiry extends Document {
  studentName: string;
  phoneNumber: string;
  targetClass: string;
  interestedExams: mongoose.Types.ObjectId[]; // Reference
  message?: string;
  status: 'Pending' | 'Contacted' | 'Converted' | 'Rejected';
}

const EnquirySchema: Schema = new Schema({
  studentName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  targetClass: { type: String, required: true },

  interestedExams: [{
    type: Schema.Types.ObjectId,
    ref: 'TargetExam',
    default: []
  }],

  message: { type: String },
  status: { 
    type: String, 
    enum: ['Pending', 'Contacted', 'Converted', 'Rejected'], 
    default: 'Pending',
  },
}, { timestamps: true });

export default mongoose.model<IEnquiry>('Enquiry', EnquirySchema);
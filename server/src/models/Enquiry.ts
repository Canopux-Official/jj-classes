import mongoose, { Schema, Document } from 'mongoose';

export interface IEnquiry extends Document {
  studentName: string;
  phoneNumber: string;
  targetClass: string;
  interestedExams: string[];
  message?: string;
  status: 'Pending' | 'Contacted' | 'Converted' | 'Rejected';
}

const EnquirySchema: Schema = new Schema({
  studentName: { 
    type: String, 
    required: true,
    // Comment: Name provided by the visitor.
  },

  phoneNumber: { 
    type: String, 
    required: true,
    // Comment: Contact number to call them back.
  },

  targetClass: { 
    type: String, 
    required: true,
    // Comment: Which class are they looking for?
  },

  interestedExams: {
    type: [String],
    enum: ['JEE', 'NEET', 'Boards'],
    default: [],
    // Comment: Helps the counselor know if they should pitch the JEE batch or NEET batch during the call.
  },

  message: { 
    type: String,
    // Comment: Any specific query they typed (e.g., "What is the fee structure?").
  },

  status: { 
    type: String, 
    enum: ['Pending', 'Contacted', 'Converted', 'Rejected'], 
    default: 'Pending',
    // Comment: Pipeline management. 
    // 'Pending': Needs a call. 
    // 'Contacted': Called, waiting for decision. 
    // 'Converted': Joined (Move data to Student schema). 
    // 'Rejected': Not interested.
  },
}, { timestamps: true });

export default mongoose.model<IEnquiry>('Enquiry', EnquirySchema);
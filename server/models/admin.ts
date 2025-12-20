import mongoose, { Schema, Document } from 'mongoose';

export interface IAdmin extends Document {
  name: string;
  phoneNumber: string;
  role: 'superadmin' | 'admin';
}

const AdminSchema: Schema = new Schema({
  name: { 
    type: String, 
    required: true,
    // Comment: Name of the administrator.
  },

  phoneNumber: { 
    type: String, 
    required: true, 
    unique: true,
    // Comment: The specific phone number authorized to access the Admin Panel. 
    // Login flow checks this collection first.
  },

  role: { 
    type: String, 
    enum: ['superadmin', 'admin'], 
    default: 'admin',
    // Comment: Future-proofing. 'superadmin' might be able to delete other admins, 
    // while 'admin' can only manage students.
  },
}, { timestamps: true });

export default mongoose.model<IAdmin>('Admin', AdminSchema);
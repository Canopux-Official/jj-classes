import mongoose, { Schema, Document } from 'mongoose';

export interface IOtp extends Document {
  phoneNumber: string;
  otp: string;
  createdAt: Date;
}

const OtpSchema: Schema = new Schema({
  phoneNumber: { 
    type: String, 
    required: true,
    // Comment: Who requested the OTP?
  },

  otp: { 
    type: String, 
    required: true,
    // Comment: The code sent to their phone (e.g., "4582").
  },

  createdAt: { 
    type: Date, 
    default: Date.now, 
    expires: 300,
    // Comment: TTL (Time To Live) Index. 
    // MongoDB will automatically DELETE this document 300 seconds (5 minutes) after creation. 
    // Ensures OTPs don't last forever.
  }
});

export default mongoose.model<IOtp>('Otp', OtpSchema);
import mongoose from 'mongoose';

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  const MONGO_URI = process.env.MONGO_URI as string;

  if (!MONGO_URI) {
    console.error("❌ MONGO_URI is NOT defined in environment variables");
    throw new Error('Please define the MONGO_URI environment variable');
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 1, // Crucial for serverless environments
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      maxIdleTimeMS: 10000,
      family: 4
    };

    cached.promise = mongoose.connect(MONGO_URI, opts)
      .then((mongooseInstance) => {
        console.log("✅ MongoDB Connection Established");
        return mongooseInstance;
      })
      .catch((err) => {
        console.error("❌ MongoDB Connection Failed:", err.message);
        throw err;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    console.error("❌ Error while awaiting MongoDB connection:", e);
    cached.promise = null;
    throw e;
  }

  return cached.conn;
};

export default connectDB;
import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  let uri = process.env.MONGODB_URI?.trim();
  
  if (!uri) {
    throw new Error('MONGODB_URI is not defined');
  }

  // Strip quotes if they were accidentally included in the environment variable
  if ((uri.startsWith('"') && uri.endsWith('"')) || (uri.startsWith("'") && uri.endsWith("'"))) {
    uri = uri.slice(1, -1).trim();
  }

  await mongoose.connect(uri);
  console.log('MongoDB connected');
};

export default connectDB;

import mongoose from 'mongoose';
import { MONGO_URI } from './Env';

export async function connectDB() {
  try {
    const db = await mongoose.connect(MONGO_URI);
    
    db.connection.on('error', console.error.bind(console, 'Connection error:'));
    db.connection.once('open', () => {
      console.log('Connected to MongoDB!');
    });

    return db;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit process with failure
  }
}

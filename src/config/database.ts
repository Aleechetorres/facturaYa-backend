import mongoose from 'mongoose';

  export const connectDB = async () => {
    try {
      const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/facturaYa';
      await mongoose.connect(mongoURI);
      console.log('MongoDB conectado exitosamente');
    } catch (error) {
      console.error('Error conectando MongoDB:', error);
      process.exit(1);
    }
  };
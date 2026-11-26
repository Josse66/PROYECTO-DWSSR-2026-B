import 'dotenv/config';
import mongoose from 'mongoose';
import logger from './winston.js';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/motor_monitor';

mongoose.connection.on('connected', () => logger.info('🍃 MongoDB conectado'));
mongoose.connection.on('disconnected', () => logger.warn('🍃 MongoDB desconectado'));
mongoose.connection.on('error', (err) => logger.error(`🍃 Error de MongoDB: ${err.message}`));

export default async function connectMongo() {
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
  } catch (err) {
    logger.error(`🍃 No se pudo conectar a MongoDB: ${err.message}`);
  }
}

import mongoose from 'mongoose';

const runSchema = new mongoose.Schema(
  {
    runId: { type: String, required: true, unique: true },
    deviceId: { type: String, required: true, index: true },
    condition: { type: String, required: true },
    label: { type: String, enum: ['normal', 'anomalo'], required: true },
    origin: {
      type: String,
      enum: ['normal', 'inducida', 'observada', 'falla-real'],
      default: 'normal',
    },
    split: { type: String, enum: ['entrenamiento', 'evaluacion'], default: 'evaluacion' },
    notes: String,
    startedAt: { type: Date, default: Date.now },
    endedAt: Date,
  },
  { timestamps: true },
);

export default mongoose.model('Run', runSchema);

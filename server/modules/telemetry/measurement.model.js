import mongoose from 'mongoose';

const { Schema } = mongoose;

const readingSchema = new Schema(
  { value: { type: Number, required: true }, unit: { type: String, required: true } },
  { _id: false },
);

const detectionSchema = new Schema(
  {
    algorithm: { type: String, required: true },
    params: Schema.Types.Mixed,
    score: Number,
    isAnomaly: { type: Boolean, required: true },
  },
  { _id: false },
);

const measurementSchema = new Schema({
  deviceId: { type: String, required: true },
  runId: { type: String, required: true },
  ts: { type: Date, required: true },
  readings: { type: Map, of: readingSchema, required: true },
  detections: [detectionSchema],
  receivedAt: { type: Date, default: Date.now },
});

measurementSchema.index({ deviceId: 1, runId: 1, ts: 1 });

export default mongoose.model('Measurement', measurementSchema);

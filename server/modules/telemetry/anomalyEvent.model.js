import mongoose from 'mongoose';

const anomalyEventSchema = new mongoose.Schema({
  deviceId: { type: String, required: true },
  runId: { type: String, required: true },
  ts: { type: Date, required: true },
  algorithm: { type: String, required: true },
  params: mongoose.Schema.Types.Mixed,
  score: Number,
  variables: [String],
  measurementId: { type: mongoose.Schema.Types.ObjectId, ref: 'Measurement' },
});

anomalyEventSchema.index({ deviceId: 1, ts: -1 });

export default mongoose.model('AnomalyEvent', anomalyEventSchema);

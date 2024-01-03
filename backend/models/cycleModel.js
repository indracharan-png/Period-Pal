const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cycleSchema = new Schema({
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  flowIntensity: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  user_id: {
    type: String,
    required: true,
  }
  // symptoms: {
  //   type: [String],
  // },
}, { timestamps: true });

const Cycle = mongoose.model("Cycle", cycleSchema);

module.exports = Cycle;

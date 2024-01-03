const Cycle = require("../models/cycleModel");
const mongoose = require("mongoose");



// get all cycles
const getCycles = async (req, res) => {
  const user_id = req.user._id;
  const cycles = await Cycle.find({user_id}).sort({ startDate: -1 });
  res.status(200).json(cycles);
};

// get a single cycle
const getCycle = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid Id" });
  }
  const cycle = await Cycle.findById(id);

  if (!cycle) {
    return res.status(400).json({ error: "No such cycle" });
  }

  res.status(200).json(cycle);
};

// post a cycle
const createCycle = async (req, res) => {
  const { startDate, endDate, flowIntensity, symptoms } = req.body;
  let emptyFields = [];
  if (!startDate) {
    emptyFields.push("Start Date");
  }
  if (!endDate) {
    emptyFields.push("End Date");
  }
  if (!flowIntensity) {
    emptyFields.push("Flow Intensity");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields: emptyFields });
  }

  try {
    const user_id = req.user._id;
    const cycle = await Cycle.create({
      startDate,
      endDate,
      flowIntensity,
      symptoms,
      user_id,
    });
    res.status(200).json(cycle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a cycle
const deleteCycle = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid Id" });
  }
  const cycle = await Cycle.findByIdAndDelete(id);
  if (!cycle) {
    return res.status(400).json({ error: "No such cycle" });
  }

  res.status(200).json(cycle);
};

// patch a cycle
const updateCycle = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid Id" });
  }
  const cycle = await Cycle.findByIdAndUpdate(id, { ...req.body });
  if (!cycle) {
    return res.status(400).json({ error: "No such cycle" });
  }
  res.status(200).json(cycle);
};

module.exports = {
  createCycle,
  getCycles,
  getCycle,
  deleteCycle,
  updateCycle,
};

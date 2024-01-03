const PadService = require("../models/padServiceModel");
const mongoose = require("mongoose");


// get all pad service records
const getPadServices = async (req, res) => {
    const padServices = await PadService.find({}).sort({ createdAt: -1 });
    res.status(200).json(padServices);
}

// get pad service linked to a specific mail
const getPadService = async (req, res) => {
    const { email } = req.params;
    try {
        const service = await PadService.findOne({ email });
        if (!service) {
            return res.status(404).json({ error: "Pad service not found" });
        }
        res.status(200).json(service);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
}

// create a new pad service record
const addPadService = async (req, res) => {
    const { email, numberOfPads } = req.body;

    try {
        const padService = await PadService.create({ email, numberOfPads });
        res.status(200).json(padService);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

// delete the record with the given id
const deletePadService = async (req, res) => {
    const { email } = req.params;
    try {
        const deletedPadService = await PadService.findOneAndDelete(email);
        if (!deletedPadService) {
            return res.status(404).json({ message: 'Pad service not found' });
        }
        res.status(200).json({ message: 'Pad service deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getPadServices,
    addPadService,
    deletePadService,
}
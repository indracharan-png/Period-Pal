const mongoose = require('mongoose');
const { Schema } = mongoose;

const padServiceSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    numberOfPads: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model("PadService", padServiceSchema);









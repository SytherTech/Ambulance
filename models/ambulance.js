const mongoose = require('mongoose');

const ambulanceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});

const Ambulance = mongoose.model('Ambulance', ambulanceSchema);

module.exports = Ambulance;
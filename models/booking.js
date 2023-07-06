const mongoose = require('mongoose');

const bookAmbulanceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "Pending"
    },
    date: {
        type: Date,
        default: Date.now()
    }

});

const BookAmbulance = mongoose.model('BookAmbulance', bookAmbulanceSchema);

module.exports = BookAmbulance;

const express = require('express');
const router = express.Router();
const BookAmbulance = require('../models/booking');

// POST route to add a booking
router.post('/bookings', async (req, res) => {
    try {
        const { name, price, img, username, phone, address } = req.body;
        console.log(req.body)
        // Create a new booking
        const booking = new BookAmbulance({
            name,
            price,
            img,
            username,
            phone,
            address
        });

        // Save the booking to the database
        await booking.save();

        res.render('success-book')
    } catch (err) {
        console.error('Error adding booking', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/update', async (req, res) => {
    const selectedOption = req.body.selectedOption;
    const index = req.body.index;
    console.log(req.body)
    await BookAmbulance.findByIdAndUpdate(
        { _id: index },
        { $set: { status: selectedOption } },

    );

    res.redirect('/admin-bookings')
});

router.get('/bookings', async (req, res) => {
    try {
        const bookings = await BookAmbulance.find();
        res.status(200).json(bookings);
    } catch (err) {
        console.error('Error getting bookings', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
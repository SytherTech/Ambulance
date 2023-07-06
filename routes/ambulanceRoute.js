const express = require('express');
const router = express.Router();
const Ambulance = require('../models/ambulance');
const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.jpg');
    },
});

const upload = multer({ storage: storage });

router.post('/ambulances', upload.single('image'), async (req, res) => {
    try {
        const { name, price } = req.body;
        const img = req.file.filename;

        // Create a new ambulance
        const ambulance = new Ambulance({
            name,
            img,
            price,
        });

        // Save the ambulance to the database
        await ambulance.save();

        res.status(201).json({ message: 'Ambulance added successfully' });
    } catch (err) {
        console.error('Error adding ambulance', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get all ambulances
router.get('/ambulances', async (req, res) => {
    try {
        const ambulances = await Ambulance.find();
        res.render('ambulances', { ambulances });
    } catch (err) {
        console.error('Error getting ambulances', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
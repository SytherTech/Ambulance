const express = require('express');
const ContactModel = require('../models/contact')

const router = express.Router();


router.post('/contact', async (req, res) => {

    try {

        var saveContact = ContactModel.create({
            "name": req.body.name,
            "message": req.body.message,
            "phone": req.body.phone
        })


        console.log("doing")
        res.redirect('/contact')

    } catch (e) {

    }

})




module.exports = router;
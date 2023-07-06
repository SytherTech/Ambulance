const bodyParser = require('body-parser');
const express = require('express')
const session = require('express-session');
const mongoose = require('mongoose');
const authRoute = require('./routes/authRoute')
const Ambulance = require('./models/ambulance');
const ambulanceRoutes = require('./routes/ambulanceRoute');
const path = require('path');
const bookingRoute = require('./routes/bookRoute');
const app = express();
const BookedAmbulance = require('./models/booking')

app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(session({
    secret: 'YourSecretKey',
    resave: true,
    saveUninitialized: true
}));

mongoose.connect('mongodb://127.0.0.1:27017/your-database-name', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');

    })
    .catch(err => {
        console.error('Error connecting to MongoDB', err);
    });

app.use('/api', ambulanceRoutes);
app.use('/api', authRoute)
app.use('/api', bookingRoute);
const checkSession = (req, res, next) => {
    if (req.session.user) {
        return res.redirect('/home'); // Redirect to the home page
    }

    // No active session, proceed to the next middleware or route handler
    next();
};


app.get('/', checkSession, (req, res) => {
    res.render('login', { error: '' })
})

const checkAuth = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/'); // Redirect to the login page
    }

    // User is logged in, proceed to the next middleware or route handler
    next();
};

app.get('/home', checkAuth, async (req, res) => {

    const ambulances = await Ambulance.find();

    res.render('home', { ambulances })
})
app.get('/book', checkAuth, async (req, res) => {
    const ambulance = await Ambulance.findById(req.query.id);
    res.render('book', { ambulance })
})
app.get('/success', checkAuth, (req, res) => {
    res.render('success-book')
})
app.get('/track', checkAuth, async (req, res) => {


    const ambulances = await BookedAmbulance.find();
    res.render('track', { ambulances })
})

app.get('/contact', checkAuth, (req, res) => {
    res.render('contact')
})

app.get('/signup', (req, res) => {

    res.render('signup', { info: "", error: '' })
})

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).json({ message: 'Error destroying session' });
        }

        // Redirect or render a logout success page
        res.redirect('/'); // Redirect to the login page after logout
    });
});

app.listen(3000, () => {
    console.log("Server Running")
})
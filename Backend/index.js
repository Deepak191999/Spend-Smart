const express = require('express');
const path = require('path');
require('dotenv').config();
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors
const app = express();
const PORT = process.env.PORT || 4000;
const MongoStore = require('connect-mongo');

// CORS configuration
app.use(cors({
    origin: ['https://spend-smart-virid.vercel.app','http://localhost:3000'], // React frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true // Allow cookies to be sent/received
  }));



// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(session({ 
    secret: process.env.SESSION_SECRET,
     resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URL,
        ttl: 14 * 24 * 60 * 60 // 14 days
    }),
      cookie: {
        secure: process.env.NODE_ENV === 'production', // Set secure cookies in production
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    } }));
app.use(passport.initialize());
app.use(passport.session());

// Initialize passport
require('./authentication/passport');

// Use routes directly
app.use('/', require('./routes/user'));

// Handle 404
app.use((req, res) => {
    res.status(404).json({ message: 'Page not found' });
});

// Connect to MongoDB and start server
mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    })
    .catch((e) => {
        console.log("Error connecting to the database:", e);
    });



    
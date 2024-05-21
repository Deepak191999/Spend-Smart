const express = require('express');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config()
const mongoose = require('mongoose');
const app = express();
const PORT = 4444;


app.set('view engine', 'hbs');
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded bodies
app.use(express.json()); // Parses JSON bodies

app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

require('./authentication/passport'); // Ensure passport strategy is set up

app.use('/', require('./routes/user'));


app.use((req, res) => {
  res.render("404");
});

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`http://localhost:` + PORT);
    });
  })
  .catch((e) => {
    console.log("error fetching database");
  });

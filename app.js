// const express = require('express');
// const session = require('express-session');
// const passport = require('passport');
// require('dotenv').config()
// const mongoose = require('mongoose');
// const app = express();
// const PORT = 4444;
// const hbs= require('hbs')

// app.set('view engine', 'hbs');
// hbs.registerPartials(__dirname+'/views/patials')

// app.use(express.urlencoded({ extended: true })); // Parses URL-encoded bodies
// app.use(express.json()); // Parses JSON bodies

// app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());


const express = require('express');
const hbs = require('hbs');
const path = require('path');
require('dotenv').config()
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const app = express();
const PORT = 4444;
const moment = require('moment');


app.use(express.static(path.join(__dirname, 'public')));
// View engine setup
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Register the partials directory
hbs.registerPartials(path.join(__dirname, 'views/partials'));

hbs.registerHelper('moment', function(date, format) {
  return moment(date).format(format);
});

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
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

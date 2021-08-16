const path = require('path');
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars'); // import express-handlebars
const routes = require('./controllers'); //import from controllers routes

const PORT = process.env.PORT || 3000;

const db = require('./models');

const app = express();

app.use(logger('dev'));

const hbs = exphbs.create();
app.engine('handlebars', hbs.engine); //use handlebars
app.set('view engine', 'handlebars'); //use handlebars

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public')); //middleware to direct to public folder

// turn on routes
app.use(routes);

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/workoutTracker_db',
  {
    useNewUrlParser: true,
  }
);

// Start the server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});

require('dotenv').config();
const mongoose = require('mongoose');
// const config = require('../config/index');

const host = process.env.DATABASE_HOST;
// const port = process.env.DATABASE_PORT;
const username = process.env.DATABASE_USERNAME;
const password = process.env.DATABASE_PASSWORD;
const dbname = process.env.DATABASE_DBNAME;

let DSN = `mongodb+srv://${username}:${password}@${host}/${dbname}?retryWrites=true&w=majority`;

mongoose.connect(
  DSN,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, err => {
    if (err) {
      return console.log('Could not connect to DB: ', err);
    }
    console.log('Successfully connected to database...');
  });
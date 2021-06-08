require('dotenv').config();
const express = require('express');
const api = express();
const router = require('./router');
const jwt = require('express-jwt');
const upload = require('express-fileupload');
// const config = require('../../config/index');

api.use(express.json());

api.use(jwt({
  secret: process.env.JWT_KEY,
  algorithms: ['HS256']
}));

api.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({
      error: true,
      message: 'You need to log in in order to perform this action'
    });
  }
});

api.use(upload());

api.use(process.env.PATH_STORAGE, router);

api.listen(process.env.PORT_STORAGE, err => {
  if (err) {
    return console.log('Error happened while starting the storage service: ', err);
  }
  console.log('Storage service succesfully started on port', process.env.PORT_STORAGE);
});
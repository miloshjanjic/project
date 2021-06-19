require('../../db');
const express = require('express');
const api = express();
const router = require('./router');
const jwt = require('express-jwt');
const config = require('../../config/index');
const cors = require('cors');

api.use(express.json());
api.use(cors());

api.use(jwt({
  secret: config.get('auth').jwt_key,
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

api.use(config.get('path').recipes, router);

api.listen(config.get('ports').recipes, err => {
  if (err) {
    return console.log('Error happened while starting the recipes service: ', err);
  }
  console.log('Recipes service successfully started on port', config.get('ports').recipes);
});

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');

//   if (req.method === 'OPTIONS') {
//       res.header('Access-Control-Allow-Methods', 'PUT', 'POST', 'PATCH', 'DELETE', 'GET');
//       return res.status(200).json({});
//   }
//   next();
// });
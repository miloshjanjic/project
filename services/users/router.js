const express = require('express');
const router = express.Router();
const controller = require('../../controllers/users');

router.get('/:id', controller.fetchOne)
      // .get('/', controller.fetchAll)
      ;

module.exports = router;
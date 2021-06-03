const express = require('express');
const router = express.Router();
const controller = require('../../controllers/recipes');

router.get('/', controller.fetchAll)
      .get('/:id', controller.fetchOne)
      .post('/:id',controller.POST);

module.exports = router;
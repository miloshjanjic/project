const express = require('express');
const router = express.Router();
const controller = require('../../controllers/recipes');

router.get('/', controller.fetchAll)
      .get('/:id', controller.fetchOne)
      .post('/:id', controller.post)
      .patch('/:id', controller.update)
      .delete('/:id', controller.delete)
      .patch('/:id', controller.like_recipe);

module.exports = router;
const express = require('express');
const router = express.Router();
const controller = require('../../controllers/recipes');

router.get('/', controller.fetchAll)
      .get('/:id', controller.fetchOne)
      .post('/', controller.postRecipe)
      .patch('/:id', controller.updateRecipe)
      .delete('/:id', controller.deleteRecipe)
      .patch('/:id', controller.likeRecipe);

module.exports = router;
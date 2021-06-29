const express = require('express');
const router = express.Router();
const controller = require('../../controllers/recipes');

router.get('/', controller.fetchAll)
      .get('/:id', controller.fetchOne)
      .post('/', controller.postRecipe)
      .patch('/:id', controller.updateRecipe)
      .delete('/:id', controller.deleteRecipe)
      .patch('/like/:id', controller.likeRecipe)
      .get('/fresh',controller.freshNew)
      .get('/popular',controller.mostPopular)
      .get('/breakfast',controller.breakfast)
      .get('/brunch',controller.brunch);

module.exports = router;
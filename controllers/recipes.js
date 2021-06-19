const { Mongoose } = require("mongoose");
const Recipe = require("../models/recipe");
// const User = require('../models/user');

// "/:userId/myRecipes" so GET request 
// const myRecipes = await Recipe.find({author: userId}).exec();
// res.status(200).send(myRecipes);

module.exports = {
  fetchAll: async (req, res) => {
    try {
      const recipes = await Recipe.find();

      res.status(200).send({
        error: false,
        message: 'All recipes are fetched !',
        recipes
      });
    } catch (error) {
      res.status(409).send({
        error: true,
        message: error.message
      });
    }
  },

  fetchOne: async (req, res) => {
    try {
      const recipe = await Recipe.findById(req.params.id);

      res.status(200).send({
        error: false,
        message: `Recipe with id #${req.params.id} fetched`,
        recipe
      });
    } catch (error) {
      res.status(409).send({
        error: true,
        message: error.message
      });
    }
  },
  
  postRecipe: async (req, res) => {
    try {
      const newRecipe = Recipe(req.body);
      await newRecipe.save();
      res.status(201).send(newRecipe);
    } catch (error) {
      res.status(409).send({
        error: true,
        message: error.message
      });
    }
  },

  updateRecipe: async (req, res) => {
    try {
      const { id } = req.params;
      const { recipeTitle, category, preparationTime, noPeople, shortDescription, recipe } = req.body;

      if (!mongoose.Types.Objectid.isValid(id))
        return res.status(404).send(`No post with id: ${_id}`);

      const updateRecipe = {
        recipeTitle, category, preparationTime, noPeople, shortDescription, recipe, _id: id
      };
      await Recipe.findByIdAndUpdate(id, updateRecipe, { new: true });

      res.status().send({
        error: false,
        message: `Recipe with id ${req.body.id} updated`,
        updateRecipe
      });
    } catch (error) {
      res.status(409).send({
        error: true,
        message: error.message
      });
    }
  },

  deleteRecipe: async (req, res) => {
    try {
      const { id } = req.params;

      if (!mongoose.Types.Objectid.isValid(id))
        return res.status(404).send(`No post with id: ${_id}`);

      await Recipe.findByIdAndRemove(id);
      res.status().send({
        error: false,
        message: `Recipe with id ${req.body.id} deleted`
      });
    } catch (error) {
      res.status(409).send({
        error: true,
        message: err.message
      });
    }
  },

  likeRecipe: async (req, res) => {
    try {
      const { id } = req.params;

      if (!mongoose.Types.Objectid.isValid(id))
        return res.status(404).send(`No post with id: ${_id}`);

      const likeRecipe = await Recipe.findById(id);
      const updatedRecipe = await Recipe.findByIdAndUpdate(id, { starCount: likeRecipe.starCount + 1 }, { new: true });

      res.status().send({
        error: false,
        message: `Recipe with id ${req.body.id} liked`,
        updatedRecipe
      });
    } catch (error) {
      res.status(409).send({
        error: true,
        message: err.message
      });
    }
  }
}

// postRecipe: async (req, res) => {
  //   const { recipeTitle, category, preparationTime, noPeople, shortDescription, recipe } = req.body;

  //   const postRecipe = new Recipe({
  //     recipeTitle, category, preparationTime, noPeople, shortDescription, recipe
  //   });

  //   try {
  //     await postRecipe.save();

  //     res.status(201).send({
  //       error: false,
  //       message: `Recipe with id ${req.body.id} created `,
  //     });
  //   } catch (err) {
  //     res.status(409).send({
  //       error: true,
  //       message: err.message
  //     });
  //   }
  // },
const { Mongoose } = require("mongoose");
const Recipe = require("../models/recipe");

module.exports = {
  fetchAll: async (req, res) => {
    // assume try catch
    const recipes = await Recipe.find();

    res.status(200).send({
      error: false,
      message: 'All recipes are fetched',
      recipes
    });
  },

  fetchOne: async (req, res) => {
    // assume try catch
    const recipe = await Recipe.findById(req.params.id);

    res.status(200).send({
      error: false,
      message: `Recipe with id #${req.params.id} fetched`,
      recipe
    });
  },

  post: async (req, res) => {
    const { recipeTitle, category, preparationTime, noPeople, shortDescription, recipe } = req.body;

    const postRecipe = new Recipe({
      recipeTitle, category, preparationTime, noPeople, shortDescription, recipe
    });

    try {
      await postRecipe.save();

      res.status(201).send({
        error: false,
        message: `Recipe with id ${req.body.id} created `,
      });
    } catch (err) {
      res.status(409).send({
        error: true,
        message: err.message
      });
    }
  },

  update: async (req, res) => {
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
  },

  delete: async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.Objectid.isValid(id))
      return res.status(404).send(`No post with id: ${_id}`);

    await Recipe.findByIdAndRemove(id);
    res.status().send({
      error: false,
      message: `Recipe with id ${req.body.id} deleted`
    });
  },

  like_recipe: async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.Objectid.isValid(id))
      return res.status(404).send(`No post with id: ${_id}`);

    const likeRecipe = await Recipe.findById(id);
    const updatedRecipe = await Recipe.findByIdAndUpdate(id, { likeCount: likeRecipe.likeCount + 1 }, { new: true });

    res.status().send({
      error: false,
      message: `Recipe with id ${req.body.id} liked`,
      updatedRecipe
    });
  }
}
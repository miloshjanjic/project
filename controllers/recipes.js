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

  POST: async (req, res) => {


    res.status().send({
      error: false,
      message: `Recipe `,

    });
  }
}
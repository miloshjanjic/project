const { Mongoose } = require("mongoose");
const Recipe = require("../models/recipe");
const User = require('../models/user');


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
    const { id } = req.params;
    try {
      const recipeOne = await Recipe.findById(id);
      res.status(200).send({
        error: false,
        message: `Recipe fetched`,
        recipeOne
      });
    } catch (error) {
      res.status(409).send({
        error: true,
        message: error.message
      });
    }
  },

  postRecipe: async (req, res) => {
    const { recipeTitle, category, preparationTime, noPeople, shortDescription, recipe } = req.body;
    const postRecipe = new Recipe({
      recipeTitle, category, preparationTime, noPeople, shortDescription, recipe
    });

    try {
      await postRecipe.save();
      res.status(201).send({
        error: false,
        message: `Recipe  created `,
        postRecipe
      });
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
      const updateRecipe = {
        recipeTitle, category, preparationTime, noPeople, shortDescription, recipe, _id: id
      };

      await Recipe.findByIdAndUpdate(id, updateRecipe, { new: true });
      res.status(201).send({
        error: false,
        message: `Recipe updated`,
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
      const deleteR = await Recipe.findByIdAndDelete(id);
      res.status(200).send({
        error: false,
        message: `Recipe  deleted`,
        deleteR
      });
    } catch (error) {
      res.status(409).send({
        error: true,
        message: error.message
      });
    }
  },

  likeRecipe: async (req, res) => {
    try {
      const { id } = req.params;
      const likeR = await Recipe.findById(id);
      const updatedRecipe = await Recipe.findByIdAndUpdate(
        id,
        { starCount: likeR.starCount + 1 },
        { new: true });

      res.status(201).send({
        error: false,
        message: `Recipe  liked`,
        updatedRecipe
      });
    } catch (error) {
      res.status(409).send({
        error: true,
        message: error.message
      });
    }
  },

  freshNew: async (req, res) => {
    try {
      const recipes = await Recipe.find();
      const freshAndNew = recipes.reverse();
      const reverse = await freshAndNew.slice(0, 3);
      res.status(200).send({
        error: false,
        message: "Fresh-New recipes are fetched",
        reverse
      });
    } catch (error) {
      res.status(400).send({
        error: true,
        messege: error.message
      });
    }
  },

  mostPopular: async (req, res) => {
    try {
      const recipes = await Recipe.find();
      const sorted = await recipes.sort((a, b) => {
        return b.starCount - a.starCount;
      });
      const popular = await sorted.slice(0, 6);
      res.status(200).send({
        error: false,
        message: "Most-Popular recipes fetched",
        popular
      });
    } catch (error) {
      res.status(400).send({
        error: true,
        messege: error.message
      });
    }
  },

  breakfast: async (req, res) => {
    try {
      const breakfastR = await Recipe.find({ category: 'breakfast' }).exec();
      res.status(200).send({
        error: false,
        message: 'Breakfast recipes fetched',
        breakfastR
      });
    } catch (error) {
      res.status(500).send({
        error: true,
        messege: error.message
      });
    }
  },

  brunch: async (req, res) => {
    try {
      const brunchR = await Recipe.find({ category: 'brunch' }).exec();
      res.status(200).send({
        error: false,
        message: 'Brunch recipes fetched',
        brunchR
      });
    } catch (error) {
      res.status(500).send({
        error: true,
        messege: error.message
      });
    }
  },
}
// "/:userId/myRecipes" so GET request
// const myRecipes = await Recipe.find({author: userId}).exec();
// res.status(200).send(myRecipes);

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

            // fetchOne: async (req, res) => {
              //   const {id} = req.params;
              //   try {
      //     // const user = await User.findById(req.params.id);
      //     const recipe = await Recipe.findById(id);
      //     // const recipe = await Recipe.find({ userId: req.params.id });

      //     res.status(200).send({
        //       error: false,
        //       message: `User with id #${req.params.id} recipes fetched`,
        //       recipe
        //     });
        //   } catch (error) {res.status().send(error)
        //   }
        // },
      // fetchOne res.status(409).send({
        //   error: true,
        //   message: error.message
      // });
                        // postRecipe: async (req, res) => {
                        //   try {
                        //     let recipe = {
                        //       ...req.body,
                        //       userId: req.user.id,
                        //     };
                        //     await Recipe.create(recipe);
                        //     res.status(200).send({
                        //       error: false,
                        //       recipe,
                        //     });
                        //   } catch (err) {
                        //     res.status(500).send({
                        //       error: true,
                        //       message: err.message,
                        //     });
                        //   }
                        // },
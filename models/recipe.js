const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
  recipeTitle: {
    type: String,
    required: ['Recipe Title is a required field']
  },
  category: {
    type: String,
    required: ['Category is a required field']
  },
  preparationTime: {
    type: String,
    required: ['Preparation time is a required field']
  },
  noPeople: {
    type: String,
    required: ['Np. People is a required field']
  },
  shortDescription: {
    type: String,
    required: ['Short description is a required field']
  },
  recipe: {
    type: String,
    required: ['Resipe is a required field']
  }
});

module.exports = mongoose.model('Recipe', recipeSchema);
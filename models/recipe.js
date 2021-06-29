const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
  recipeTitle: {
    type: String,
    required: ['Recipe Title is a required field']
  },
  category: {
    type: Array,
    required: ['Category is a required field']
  },
  preparationTime: {
    type: String,
    required: ['Preparation time is a required field']
  },
  noPeople: {
    type: String,
    required: ['No. People is a required field']
  },
  shortDescription: {
    type: String,
    required: ['Short description is a required field']
  },
  recipe: {
    type: String,
    required: ['Resipe is a required field']
  },
  starCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId
  },
  imageName: {
    type: String,
  }
},
  { timestamps: true },
  { collection: "recipes" }
);

module.exports = mongoose.model('Recipe', recipeSchema);
const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema({
  FoodName: {
    type: String,
    min: 3,
    trim: true,
  },
  FoodImage: {
    type: String,
    required: true,
  },
  Tags: {
    type: String,
    required: true
  },
  Tags2: {
    type: String,
    required: true
  },
  Description: {
    type: String,
    required: true
  },
  Price: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  },
  CategoryId: {
    type: String,
    required:true
  },
});

FoodSchema.path("FoodName").index({ text: true });
const Food = mongoose.model("Food", FoodSchema);
module.exports = Food;

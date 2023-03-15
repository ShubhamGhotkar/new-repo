const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  catId: {
    type: String,
  },
});

const Product = mongoose.model("PRODUCT", productSchema);

module.exports = Product;

const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const productSchema = new mongoose.Schema({
  title: String,
  slug: { 
    type: String, 
    slug: "title",
    unique: true
  },
  product_category_id: {
    type: String,
    default: ""
  },
  description: String,
  price: Number,
  discountPercentage: Number,
  stock: Number, 
  thumbnail: String,
  status: String,
  position: Number,
  createdBy: {
    account_id: String,
    createAt: {
      type: Date,
      default: Date.now
    }
  },
  deletedBy: {
    account_id: String,
    deletedAt: Date,
  },
  updatedBy:[
    {
      account_id: String,
      updatedAt: Date,
    }
  ]
});

const Product = mongoose.model("Product", productSchema, "products");
module.exports = Product;

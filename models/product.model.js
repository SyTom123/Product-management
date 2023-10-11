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
  deleted: {
    type: Boolean,
    default: false
  },
  deletedAt: Date
}, {timestamps: true});

const Product = mongoose.model("Product", productSchema, "products");
module.exports = Product;

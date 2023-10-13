const ProductCategory = require('../../models/product-category.model');
const createTree = require("../../helper/createTree");

module.exports.category = async(req, res, next) => {
    const categoryProduct = await ProductCategory.find({
        deleted: false
    })

    const newCategoryProducts = createTree(categoryProduct);

    res.locals.layoutCategoryProducts = newCategoryProducts;
    next();
}
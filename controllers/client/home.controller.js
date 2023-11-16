const Product = require("../../models/product.model");
const CategoryProduct = require("../../models/product-category.model")
const productsHelper = require("../../helper/product");
// [GET] /products
module.exports.index = async (req, res) => {

    //Hiển thị bài viết nổi bật
    const productsFeatured = await Product.find({
        featured: "1",
        deleted:false,
        status: "active"
    }).sort({position: "desc"}).limit(6);

    const newProductsFeatured = productsHelper.priceNewProduct(productsFeatured);

    // Hiển thị danh sách bài viết mới nhất
    const productsNew = await Product.find({
        deleted:false,
        status: "active"
    }).sort({position: "desc"}).limit(8);
    
    const newProductsNew =  productsHelper.priceNewProduct(productsNew);

    const categoryProduct =await CategoryProduct.find({deleted: false})
    res.render("client/pages/home/index.pug", {
        pageTitle: "Trang chủ",
        productsFeatured: newProductsFeatured,
        productsNew: newProductsNew,
        categoryProduct: categoryProduct
    })
}
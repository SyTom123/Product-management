const Product = require("../../models/product.model");
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

    res.render("client/pages/home/index.pug", {
        pageTitle: "Trang chủ",
        productsFeatured: newProductsFeatured
    })
}
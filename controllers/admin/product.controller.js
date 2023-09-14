const Product = require('../../models/product.model');
// [GET] /admin/product
module.exports.index = async (req, res) => {
    try {
        const products = await Product.find({
            deleted: false,
           
        });

        res.render("admin/pages/products/index.pug", {
            pageTitle: "Danh sach san pham",
            products: products
        })
    } catch (error) {
        console.log(error)
    }
}

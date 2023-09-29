const Product = require('../../models/product.model');
// [GET] /product
module.exports.index = async (req, res) => {

    const products = await Product.find({
        deleted: false,
        status: "active"
    }).sort({position: "desc"});
    
    const newProducts = products.map (item => {
        item.priceNew = ((item.price * (100 - item.discountPercentage)) / 100).toFixed();
        return item;
    })

    res.render("client/pages/products/index.pug", {
        pageTitle: "Danh sach san pham",
        products: products
    })
}
module.exports.detail = async (req, res) => {
    try {
        const slug = req.params.slug;
        const product = await Product.findOne({
            slug: slug,
            deleted: false,
            status: "active"
        });
        if(!product) {
            return res.redirect("/products");
        }
        res.render("client/pages/products/detail", {
            pageTitle: "Chi tiết sản phẩm",
            product: product
        });

    } catch (error) {
        res.redirect("/");
    }
}
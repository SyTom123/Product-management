const Product = require('../../models/product.model');

module.exports.index = async (req, res) => {
    try {
        const products = await Product.find();
        
        const newProducts = products.map (item => {
            item.priceNew = ((item.price * (100 - item.discountPercentage)) / 100).toFixed();
            return item;
        })

        console.log(newProducts)

        res.render("client/pages/products/index.pug", {
            pageTitle: "Danh sach san pham",
            products: products
        })
    } catch (error) {
        console.log(error)
    }
}

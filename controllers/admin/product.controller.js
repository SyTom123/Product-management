const Product = require('../../models/product.model');
const filterStatusHelper = require("../../helper/filterStatus");
const searchHelper = require("../../helper/search.js")
// [GET] /admin/product
module.exports.index = async (req, res) => {
    try {
        // filter status
        const filterStatus = filterStatusHelper(req.query)
        //End filter status

        // Search
        let objectSearch = searchHelper(req.query);
        let find = {
            deleted: false,
        }
        if(req.query.status){
            find.status = req.query.status;
        }
        if(req.query.keyword){
            find.title = objectSearch.regex;
        }

        const products = await Product.find(find);

        res.render("admin/pages/products/index.pug", {
            pageTitle: "Danh sach san pham",
            products: products,
            filterStatus: filterStatus,
            keyword: objectSearch.keyword
        })

    } catch (error) {
        console.log(error)
    }
}

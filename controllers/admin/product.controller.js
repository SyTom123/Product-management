const Product = require('../../models/product.model');
const filterStatusHelper = require("../../helper/filterStatus")
// [GET] /admin/product
module.exports.index = async (req, res) => {
    try {
        // filter status
        const filterStatus = filterStatusHelper(req.query)
        //End filter status

        let find = {
            deleted: false,
        }
        if(req.query.status){
            find.status = req.query.status;
        }
        let keyword = ""
        if(req.query.keyword) {
            keyword = req.query.keyword;
            const regex = new RegExp(keyword, "i")
            find.title = regex;
        }

        const products = await Product.find(find);

        res.render("admin/pages/products/index.pug", {
            pageTitle: "Danh sach san pham",
            products: products,
            filterStatus: filterStatus,
            keyword: keyword
        })

    } catch (error) {
        console.log(error)
    }
}

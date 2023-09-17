const Product = require('../../models/product.model');
const filterStatusHelper = require("../../helper/filterStatus");
const searchHelper = require("../../helper/search.js");
const paginationHelper = require('../../helper/pagination')
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

        // Pagination
        const initPagination = {
            currentPage: 1,
            limitItems: 4
        }
        const countProducts  = await Product.count(find);
        const objectPagination = paginationHelper(initPagination, req.query, countProducts);


        // End Pagination
        const products = await Product.find(find)
        .limit(objectPagination.limitItems)
        .skip(objectPagination.skip);

        // const products = await Product.find(find);

        res.render("admin/pages/products/index.pug", {
            pageTitle: "Danh sach san pham",
            products: products,
            filterStatus: filterStatus,
            keyword: objectSearch.keyword,
            pagination: objectPagination
        })

    } catch (error) {
        console.log(error)
    }
}
// [GET] /admin/products/:id
module.exports.changeStatus = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;

    await Product.updateOne({_id: id}, {status: status})
    res.redirect('back')
}


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
// [PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;

    await Product.updateOne({_id: id}, {status: status})
    res.redirect('back')
}
// [PATCH] /admin/products/change-multi/:status/:id
module.exports.changeMulti = async (req, res) => {
    const type = req.body.type;
    const ids = req.body.ids.split(", ");
    switch (type) {
        case "active":
        case "inactive":
            await Product.updateMany({_id: {$in: ids}}, {status: type});
            break;
        default:
            break;
    }
    res.redirect('back');
}
// [DELETE] /admin/product/delete/:id
module.exports.deleteItem = async (req, res) => {
    const ids = req.params.id;
    await Product.deleteOne({_id:id})
    res.redirect("back");
}



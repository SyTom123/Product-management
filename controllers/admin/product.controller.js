const Product = require('../../models/product.model');
const filterStatusHelper = require("../../helper/filterStatus");
const searchHelper = require("../../helper/search.js");
const paginationHelper = require('../../helper/pagination');
const systemConfig = require('../../config/system')

// [GET] /admin/product
module.exports.index = async (req, res) => {
   
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
.sort({position: "desc"})
.limit(objectPagination.limitItems)
.skip(objectPagination.skip);

if(products.length == 0 && countProducts > 0) {
    let stringQuery = "";

    for(const key in req.query) {
        if(key != "page") {
        stringQuery += `&${key}=${req.query[key]}`;
        }
    }
    const href = `${req.baseUrl}?page=1${stringQuery}`;

    res.redirect(href);
    } 
else {
    res.render("admin/pages/products/index", {
        pageTitle: "Danh sách sản phẩm",
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination
    });
}

}
// [PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;

    await Product.updateOne({_id: id}, {status: status});
    req.flash("success", "Cập nhật trạng thái thành công!");
    res.redirect('back');
}
// [PATCH] /admin/products/change-multi/:status/:id
module.exports.changeMulti = async (req, res) => {
    const type = req.body.type;
    const ids = req.body.ids.split(", ");
    switch (type) {
        case "active":
        case "inactive":
            await Product.updateMany({_id: {$in: ids}}, {status: type});
            req.flash("success", `Cập nhật thành công trạng thái của ${ids.length} bản ghi!`);
            break;
        case "delete-all":
            await Product.updateMany({_id: {$in: ids}}, {
                deleted: true,
                deletedAt: new Date()
            });
            req.flash("success", `Xóa thành công ${ids.length} bản ghi!`);
            break;
        case "change-position": 
            for(const item of ids){
                const [id,position] = item.split("-");
                await Product.updateOne({_id:id}, {position: position})
            }
            break;
        default:
            break;
    }
    res.redirect('back');
}
// [DELETE] /admin/product/delete/:id
module.exports.deleteItem = async (req, res) => {
    const ids = req.params.id;
    // await Product.deleteOne({_id: ids}) 
    // xóa mềm
    await Product.updateOne({_id: ids}, 
        {
            deleted: true,
            deletedAt: new Date()
        }) 
    req.flash("success", "Xóa bản ghi thành công!");
    res.redirect("back");
}
//[GET] /admin/product/create
module.exports.create = async (req,res) => {
    res.render("admin/pages/products/create", {
        pageTitle: "Thêm mới sản phẩm"
    });
}
//[POST] /admin/product/createPost
module.exports.createPost = async (req,res) => {

    req.body.price = +req.body.price;
    req.body.discountPercentage = +req.body.discountPercentage;
    req.body.stock = +req.body.stock;

    if(req.body.position === "") {
        const countProducts = await Product.countDocuments();
        const position = countProducts + 1;
        req.body.position = position;
    }
    else {
        req.body.position = +req.body.position;
    }
    // if(req.file && req.file.filename){
    //     req.body.thumbnail = `/uploads/${req.file.filename}`;
    // }
    const product = new Product(req.body);
    await product.save();
    req.flash("success", "Thêm mới sản phẩm thành công");

    res.redirect(`/${systemConfig.prefix_admin}/products`);
}

//[GET] /admin/product/edit 
module.exports.edit = async (req, res) => {
    const id = req.params.id
    const product = await Product.findOne({
        _id: id,
        deleted: false
    })
    res.render("admin/pages/products/edit.pug", {
        product: product
    })
}

//[PATCH] /admin/product/editPatch
module.exports.editPatch = async (req,res) => {
    
    const id = req.params.id;

    req.body.price = +req.body.price;
    req.body.discountPercentage = +req.body.discountPercentage;
    req.body.stock = +req.body.stock; 
    req.body.position = +req.body.position;
    
    if(req.file && req.file.filename){
        req.body.thumbnail = `/uploads/${req.file.filename}`;
        
    }

    await Product.updateOne({_id: id}, req.body);
    req.flash("success", "Cập nhật sản phẩm thành công");

    res.redirect("back");
}
//[GET] /admin/product/detail
module.exports.detail = async (req, res) => {
   
    const id = req.params.id;

    const product = await Product.findOne({
        _id: id,
        deleted: false
    })
    res.render("admin/pages/products/detail.pug", {
        product: product
    })
}

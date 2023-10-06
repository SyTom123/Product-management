const ProductCategory = require('../../models/product-category.model');
const systemConfig = require("../../config/system");
const createTree = require("../../helper/createTree");

//[GET] /admin/product-category
module.exports.index = async (req, res) => {

    let find = {
        deleted: false,
    }

    const records = await ProductCategory.find(find);

    const newRecords = createTree(records);
    console.log(newRecords);
    res.render("admin/pages/product-category/index", {
        records: newRecords
    });
    

}

//[GET] /admin/product-category/create
module.exports.create = async(req, res) => {
    let find = {
        deleted: false
    }
    const records = await ProductCategory.find(find);

    const newRecords = createTree(records);
   
    res.render("admin/pages/product-category/create.pug",{
        pageTitle: "Tạo Danh mục sản phẩm",
        records: newRecords
    })
}

//[POST] /admin/product-category/create
module.exports.createPost = async(req, res) => {
    if(req.body.position == ""){
        const countRecords = await ProductCategory.countDocuments();
        req.body.position = +countRecords + 1;
    }
    else {
        req.body.position= +(req.body.position);
    }

    const record = new ProductCategory(req.body);
    await record.save();

    res.redirect(`/${systemConfig.prefix_admin}/product-category`);
}
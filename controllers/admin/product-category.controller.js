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

//[GET] /admin/product-category/edit/:id
module.exports.edit = async(req, res) => {

    const id = req.params.id;
    const data = await ProductCategory.findOne({
        _id:id,
        deleted:false
    });

    const records= await ProductCategory.find({
        deleted: false
    })
    const newRecords = createTree(records);
    res.render("admin/pages/product-category/edit",{
        pageTitle: "Chỉnh sửa danh mục sản phẩm",
        data:data,
        records: newRecords
    })

}
//[PATCH] /admin/product-category/edit/:id
module.exports.editPatch = async(req, res) => {

    const id = req.params.id;
    req.body.position = +req.body.position;

    await ProductCategory.updateOne({_id: id}, req.body);

    req.flash("success", "Chỉnh sửa danh mục sản phẩm thành công");

    res.redirect("back");

}
//[GET] /admin/product-category/detail/:id
module.exports.detail = async(req, res) => {

    const id = req.params.id;
    const data = await ProductCategory.findOne({
        _id:id,
        deleted:false
    });
    if(data.parent_id){
        const record= await ProductCategory.findOne({
            _id:data.parent_id
        })
        data.parent_title = record.title;
    }
    res.render("admin/pages/product-category/detail",{
        pageTitle: "Chi tiết danh mục sản phẩm",
        data:data,
    })
    
}
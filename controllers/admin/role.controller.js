const Role= require("../../models/role.modle");
const systemConfig = require("../../config/system");
//[GET] /admin/product/
module.exports.index = async (req, res) => {
    const records = await Role.find({
        deleted: false
    })
    
    res.render("admin/pages/roles/index.pug",{
        pageTitle: "Danh sách nhóm quyền",
        records: records
    })
}

//[GET] /admin/product/create
module.exports.create = async (req, res) => {
    res.render("admin/pages/roles/create.pug",{
        pageTitle: "Tạo mới nhóm quyền"
    })
}
//[POST] /admin/product/create
module.exports.createPost = async (req, res) => {
    const record = new Role(req.body);
    await record.save();

    req.flash("success", "Thêm nhóm quyền thành công");
    res.redirect(`/${systemConfig.prefix_admin}/roles`);
}

//[GET] /admin/product/permissions
module.exports.permissions = async (req, res) => {
    const records = await Role.find({
        deleted: false
    })

    res.render("admin/pages/roles/permissions",{
        pageTitle: "Phân quyền",
        records: records
    })
}
//[PATCH] /admin/product/permissionsPatch
module.exports.permissionsPatch = async (req, res) => {
    const permissions = JSON.parse(req.body.permissions);

    for(const item of permissions) {
        await Role.updateOne(
            {_id: item.id},
            {
                permissions: item.permissions
            }
        )
    }
    req.flash("success","Cập nhật phân quyền thành công");
    res.redirect("back");
}
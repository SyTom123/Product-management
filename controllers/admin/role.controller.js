const Role= require("../../models/role.modle");
const systemConfig = require("../../config/system");
//[GET] /admin/role/
module.exports.index = async (req, res) => {
    const records = await Role.find({
        deleted: false
    })
    
    res.render("admin/pages/roles/index.pug",{
        pageTitle: "Danh sách nhóm quyền",
        records: records,
        status_04 : "active"
    })
}

//[GET] /admin/role/create
module.exports.create = async (req, res) => {
    res.render("admin/pages/roles/create.pug",{
        pageTitle: "Tạo mới nhóm quyền"
    })
}
//[POST] /admin/role/create
module.exports.createPost = async (req, res) => {
    const record = new Role(req.body);
    await record.save();

    req.flash("success", "Thêm nhóm quyền thành công");
    res.redirect(`/${systemConfig.prefix_admin}/roles`);
}

//[GET] /admin/role/permissions
module.exports.permissions = async (req, res) => {
    const records = await Role.find({
        deleted: false
    })

    res.render("admin/pages/roles/permissions",{
        pageTitle: "Phân quyền",
        records: records,
        status_05: "active"
    })
}
//[PATCH] /admin/role/permissionsPatch
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
//[GET]/role/edit/:id
module.exports.edit = async (req, res) => {
    const id = req.body.id;

    const role = await Role.findOne({
        id: id, 
        deleted: false
    })
    res.render("admin/pages/roles/edit.pug", {
        pageTitle: "Chỉnh sửa nhóm quyền",
        role: role
    });
};

//[PATCH]/role/edit/:id
module.exports.editPatch = async (req, res) => {
    const id = req.body.id;

    const role = await Role.updateOne({
        id: id, 
    }, req.body);
    
    req.flash("success", "Cập nhật nhóm quyền thành công");
    res.redirect(`/${systemConfig.prefix_admin}/roles`);
};
//[PATCH]/role/delete/:id
module.exports.delete = async (req, res) => {
    
    const id = req.body.id;

    const role = await Role.updateOne({
        id: id, 
    },{
        deleted: true
    });
    
    req.flash("success", "Xóa nhóm quyền thành công");
    res.redirect(`/${systemConfig.prefixAdmin}/roles`);
};

//[GET]/role/detail
module.exports.detail = async (req, res) => {

    const id = req. params.id;
    const role = await Role.findOne({
        _id: id, 
        deleted: false
    })
    res.render("admin/pages/roles/detail.pug", {
        pageTitle: "Chi tiết nhóm quyền",
        role: role
    });
};
//[GET]/role/permissions
module.exports.permissions = async (req, res) => {
    const records = await Role.find({deleted: false});
    res.render("admin/pages/roles/permissions.pug", {
        pageTitle: "Phân quyền",
        records: records
    });
};

//[PATCH]/role/permissions/
module.exports.permissionsPatch = async (req, res) => {
    const permissions = JSON.parse(req.body.permissions);
    
    for(const item of permissions) {
        await Role.updateOne(
            {
                _id: item.id
            },
            {
                permissions: item.permissions
            }
        )
    }

    req.flash("success", "Cập nhật phân quyền thành công!");

    res.redirect("back");
};
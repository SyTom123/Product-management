const Account = require('../../models/account.model');
const Role = require("../../models/role.modle");
const systemConfig = require("../../config/system.js");

module.exports.requireAuth = async (req, res, next) => {
  
    if(!req.cookies.token) {
      res.redirect(`/${systemConfig.prefix_admin}/auth/login`);
      return;
    }
    const user = await Account.findOne({
        token: req.cookies.token
    })
    if(!user) {
        res.redirect(`/${systemConfig.prefix_admin}/auth/login`);
        return;
    }
    
    const role = await Role.findOne({
        _id: user.role_id
    }).select("title permissions");
    res.locals.user = user;
    res.locals.role = role;

    next();
}
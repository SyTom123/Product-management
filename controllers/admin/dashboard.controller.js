const ProductCategory = require('../../models/product-category.model');
const Product = require('../../models/product.model');
const Order = require("../../models/order.model");
const Account = require('../../models/account.model');
const User = require('../../models/user.model');
// [GET] /admin/dashboard
module.exports.dashboard =async (req, res) => {
    const statistic = {
        categoryProduct: {
            total: 0,
            active: 0,
            inactive: 0,
        },
        product: {
            total: 0,
            active: 0,
            inactive: 0,
        },
        order: {
            total: 0,
            initial: 0,
            finish: 0,
            ongoing: 0
        },
        account: {
            total: 0,
            active: 0,
            inactive: 0,
        },
        user: {
            total: 0,
            active: 0,
            inactive: 0,
        },
    };
    statistic.categoryProduct.total = await ProductCategory.count({deleted: false});
    statistic.categoryProduct.active = await ProductCategory.count(
        {
            status: "active", 
            deleted: false
        }
    );
    statistic.categoryProduct.inactive =await ProductCategory.count(
        {
            status: "inactive", 
            deleted: false
        }
    );
    statistic.product.total = await Product.count({deleted: false});
    statistic.product.active = await Product.count(
        {
            status: "active", 
            deleted: false
        }
    );
    statistic.product.inactive =await Product.count(
        {
            status: "inactive", 
            deleted: false
        }
    );
    statistic.order.total = await Order.count({deleted: false});
    statistic.order.initial = await Order.count(
        {
            status: "initial", 
            deleted: false
        }
    );
    statistic.order.ongoing = await Order.count(
        {
            status: "ongoing", 
            deleted: false
        }
    );
    statistic.order.finish = await Order.count(
        {
            status: "finish", 
            deleted: false
        }
    );

    statistic.account.total = await Account.count({deleted: false});
    statistic.account.active = await Account.count(
        {
            status: "active", 
            deleted: false
        }
    );
    statistic.account.inactive =await Account.count(
        {
            status: "inactive", 
            deleted: false
        }
    );

    statistic.user.total = await User.count({deleted: false});
    statistic.user.active = await User.count(
        {
            status: "active", 
            deleted: false
        }
    );
    statistic.user.inactive =await User.count(
        {
            status: "inactive", 
            deleted: false
        }
    );

    res.render("admin/pages/dashboard/index", {
        pageTitle: "Tổng quan",
        statistic: statistic,
        status_01: "active"
    });
};

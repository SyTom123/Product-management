const Order = require("../../models/order.model");
const Product = require("../../models/product.model")
const productHelper = require("../../helper/product");
const formatMoneyHelper = require("../../helper/formatMoney");

module.exports.index = async(req, res) => {

    const orders = await Order.find({
        deleted: false
    })
    for(const item of orders) {
        switch (item.status) {
            case "initial":
                item.statusVN = "Chờ xác nhận"
                break;
            case "ongoing":
                item.statusVN = "Đang vận chuyển"
                break;
            case "cancel":
                item.statusVN = "Đã hủy"
                break;
            case "finish":
                item.statusVN = "Hoàn thành"
                break;
            default:
                break;
        }
        for(const product of item.products) {

            const productInfo = await Product.findOne({
                _id: product.product_id
            }).select('title thumbnail')
    
            product.productInfo = productInfo;
    
            product.priceNew = productHelper.newPrice(product);
    
            product.priceNewFormatVND = formatMoneyHelper.formatMoney(product.priceNew);
    
            product.totalPrice = product.priceNew * product.quantity;
    
            product.totalPriceFormatVND = formatMoneyHelper.formatMoney(product.totalPrice);
    
        }
        item.totalPrice = item.products.reduce((sum, item)=>sum + item.totalPrice, 0);
        item.totalPriceFormatVND = formatMoneyHelper.formatMoney(item.totalPrice);
    }

    res.render("admin/pages/orders/index.pug", {
        pageTitle: "Đơn hàng của tôi",
        orders: orders,
        status_09 : "active"
    })
}

module.exports.detail = async(req, res) => {
    const id = req.params.id;
    const order = await Order.findOne({
        _id: id,
        deleted: false
    });
    switch (order.status) {
        case "initial":
            order.statusVN = "Chờ xác nhận"
            break;
        case "ongoing":
            order.statusVN = "Đang vận chuyển"
            break;
        case "cancel":
            order.statusVN = "Đã hủy"
            break;
        case "finish":
            order.statusVN = "Hoàn thành"
            break;
        default:
            break;
    }
    for(const product of order.products) {
        const productInfo = await Product.findOne({
            _id: product.product_id
        }).select('title thumbnail')

        product.productInfo = productInfo;

        product.priceNew = productHelper.newPrice(product);

        product.priceNewFormatVND = formatMoneyHelper.formatMoney(product.priceNew);

        product.totalPrice = product.priceNew * product.quantity;

        product.totalPriceFormatVND = formatMoneyHelper.formatMoney(product.totalPrice);

    }
    order.totalPrice = order.products.reduce((sum, item)=>sum + item.totalPrice, 0);
    order.totalPriceFormatVND = formatMoneyHelper.formatMoney(order.totalPrice);
    res.render("admin/pages/orders/detail.pug", {
        pageTitle: "Chi tiết đơn hàng",
        order: order,
        status_09 : "active"
    })
}
//[PATCH] /admin/orders/change-status/:status/:id
module.exports.changeStatus = async(req, res) => {
    const id = req.params.id;
    const status = req.params.status;
    await Order.updateOne({
        _id: id
    }, {
        status: status
    })
    req.flash("success", 'Thay đổi trạng thái đơn hàng thành công!');
    res.redirect("back");
}
//[DELETE] /admin/orders/delete/:id
module.exports.delete = async(req, res) => {
    const id = req.params.id;
    await Order.updateOne({
        _id: id
    }, {
        deleted: true
    })
    req.flash("success", 'Xóa đơn hàng thành công!');
    res.redirect("back");
}
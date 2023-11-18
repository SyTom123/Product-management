const Order = require("../../models/order.model");
const Product = require("../../models/product.model");
const productHelper = require("../../helper/product");
const formatMoneyHelper = require("../../helper/formatMoney");

module.exports.index = async(req, res) => {

    const id = res.locals.user.id;

    const orders = await Order.find({
       user_id : id
    });
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

    res.render("client/pages/orders/orders.pug", {
        pageTitle: "Đơn hàng của tôi",
        orders: orders
    })
}
module.exports.detail = async(req, res) => {
    const id = req.params.id;
    const order = await Order.findOne({
        _id: id
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
    res.render("client/pages/orders/detail.pug", {
        pageTitle: "Chi tiết đơn hàng",
        order: order
    })
}
//[PATCH]/change-status/:status/:id
module.exports.changeStatus = async(req, res) => {
    const id = req.params.id;
    const order = await Order.findOne({
        _id: id
    })
    const now = Date.now();
    const timeCreateAt = new Date (order.createdAt);
    const timeExpire = 12 * 60 * 60 *1000;

    if(now - timeCreateAt > timeExpire){
        req.flash("error", 'Bạn chỉ được phép hủy đơn hàng trong vòng 12 giờ kể từ khi đặt.');
        res.redirect("back");
        return;
    }
    await Order.updateOne ({
        _id: id
    },
    {
        status: "cancel"
    })
    req.flash("success", 'Hủy đặt hàng thành công');
    res.redirect("back");
}
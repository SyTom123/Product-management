const Cart = require('../../models/cart.model');
const Product = require("../../models/product.model");
const productHelper = require("../../helper/product");
const formatMoneyHelper = require("../../helper/formatMoney");

//[GET]/ cart
module.exports.index = async (req, res) => {
    try {
        const cartId = req.cookies.cartId ;
        if(cartId) {
            const cart = await Cart.findOne(
                {_id : cartId}
            );
        
            if(cart.products.length > 0) {
                for(const item of cart.products) {
                    const productId = item.product_id;
        
                    const productInfo = await Product.findOne({
                        _id: productId
                    });
                    productInfo.priceNew = productHelper.newPrice(productInfo);

                    productInfo.priceNewFormatVND = productHelper.newPriceFormatVND(productInfo);
        
                    item.productInfo = productInfo
        
                    item.totalPrice = +item.quantity * item. productInfo.priceNew

                    item.totalPriceFormatVND = formatMoneyHelper.formatMoney(item.totalPrice);

                }
            } 
            cart.totalPrice = cart.products.reduce((sum, item) => sum + item.totalPrice, 0);
            
            cart.totalPriceFormatVND =  formatMoneyHelper.formatMoney(cart.totalPrice);

            res.render("client/pages/cart/index.pug", {
                pageTitle: "Trang giỏ hàng",
                cartDetail: cart
            })
        }
        else {
            res.redirect("back");
        }
    } catch (error) {
        res.redirect("/");
    }
}

//[POST] /cart/add/:productId
module.exports.addPost = async (req, res) => {

    const cartId = req.cookies.cartId;

    const productId = req.params.productId;
    const quantity = +req.body.quantity;

    const cart = await Cart.findOne({
        _id: cartId
    })
    const existProductInCart = cart.products.find(item => item.product_id == productId);
    if(existProductInCart) {
        const newQuantity = existProductInCart.quantity + quantity;
        await Cart.updateOne(
            {
                _id: cartId,
                'products.product_id': productId
            },
            {
                'products.$.quantity': newQuantity
            }
        )
    }
    else {
        const objectCart = {
            product_id: productId,
            quantity: quantity
        }
        
        await Cart.updateOne({_id: cartId}, 
        {
            $push: {products: objectCart}
        })
    }

    req.flash("success", "Thêm sản phẩm vào giỏ hàng thành công");
    res.redirect("back");
}
//[GET] /cart/delete/:productId
module.exports.delete = async (req, res) => {
    const cartId = req.cookies.cartId;
    const productId = req.params.productId;

    const ids = [];

    if(productId != "all") {
        ids.push(productId);
    }
    else{
        const cart = await Cart.findOne(
            {_id : cartId}
        );
        cart.products.forEach(product => {
            ids.push(product.product_id);
        })
    }
    for(id of ids) {
        await Cart.updateOne({
            _id: cartId,
        },{
            "$pull":{products: {"product_id": id}}
        })
    }
   
    req.flash("success", "Đã xóa sản phẩm khỏi giỏ hàng!");
    res.redirect("back");
}
//[GET] /cart/update/:productId/:quantity
module.exports.updateQuantity = async (req, res) => {
    const cartId = req.cookies.cartId;
    const productId = req.params.productId;
    const quantity = req.params.quantity;

    await Cart.updateOne({
        _id: cartId,
        'products.product_id': productId
    },{
        'products.$.quantity': quantity
    })

    req.flash("success", "Cập nhật số lượng thành công");
    res.redirect("back");
}
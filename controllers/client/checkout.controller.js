const Cart = require('../../models/cart.model');
const User = require("../../models/user.model");
const Product = require('../../models/product.model');
const Order = require('../../models/order.model');
const productHelper = require('../../helper/product');

//[GET]/checkout
module.exports.index = async(req, res) => {

    const cartId = req.cookies.cartId || "";
    if(cartId) {
        const user = await User.findOne({
            tokenUser: req.cookies.tokenUser
        })
        const cart = await Cart.findOne({
            _id: cartId
        })
    
        if(cart.products.length > 0) {
            for(const item of cart.products) {
                const productId = item.product_id;
    
                const productInfo = await Product.findOne({
                    _id: productId
                })
    
                productInfo.priceNew = productHelper.newPrice(productInfo);
    
                item.productInfo = productInfo;
    
                item.totalPrice = item.quantity * productInfo.priceNew;
            }
        }
        cart.totalPrice = cart.products.reduce((sum, item) => sum + item.totalPrice, 0);
    
        res.render('client/pages/checkout/index', {
            pageTitle: "Đặt hàng",
            cartDetail: cart,
            user: user
        })
    }
}
//[POST] /checkout/order
module.exports.order = async(req, res) => {
    const cartId = req.cookies.cartId;

    const user = await User.findOne({
        tokenUser: req.cookies.tokenUser
    })
    const userId = user._id;
    delete req.body.detailAddress;
    const userInfo = req.body;
    
    const cart = await Cart.findOne({
        _id: cartId
    });

    let products = [];
    for(const product of cart.products) {
        const objectProduct = {
            product_id: product.product_id,
            price:0,
            discountPercentage: 0,
            quantity: product.quantity
        }

        const productInfo = await Product.findOne({
            _id: product.product_id
        });
        
        const stock = productInfo.stock;
        const newStock = stock -1;
        await Product.updateOne({_id: product.product_id}, {
            stock: newStock
        })

        objectProduct.price = productInfo.price;
        objectProduct.discountPercentage = productInfo.discountPercentage;

        products.push(objectProduct);
    }
    const countOrder = await Order.countDocuments() + 1;
    const order_id = `SY-${countOrder}`;
    const status = "initial";
    const objectOrder = {
        order_id: order_id,
        status: status,
        user_id: userId,
        cart_id: cartId,
        userInfo: userInfo,
        products: products
    }
    if(cart.products.length <= 0){
        req.flash("error", 'Giỏ hàng trống')
        res.redirect("/");
        return
    }
    const order = new Order(objectOrder);
    await order.save();
    
    await Cart.updateOne({
        _id: cartId
    },{
        products: []
    })

    res.redirect(`/checkout/success/${order.id}`);
}
// [GET] /checkout/success/:orderId
module.exports.success = async (req, res) => {
   
    const order = await Order.findOne({
        _id: req.params.orderId
    })

    for(const product of order.products) {
        const productInfo = await Product.findOne({
            _id: product.product_id
        }).select('title thumbnail')

        product.productInfo = productInfo;

        product.priceNew = productHelper.newPrice(product);
        product.totalPrice = product.priceNew * product.quantity;

    }
    order.totalPrice = order.products.reduce((sum, item)=>sum + item.totalPrice, 0);
    res.render("client/pages/checkout/success", {
        pageTitle: "Đặt hàng thành công",
        order: order
    })
}
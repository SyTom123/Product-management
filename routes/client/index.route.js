const categoryMiddleware = require("../../middlewares/client/category.middleware");
const cartMiddleware = require("../../middlewares/client/cart.middleware");
const productRouter = require('./product.route');
const homeRouter = require ('./home.route');
const searchRouter = require ('./search.route.js');
const cartRouter = require ('./cart.route.js');
const checkoutRouter = require('./checkout.route.js');
const userRouter = require('./user.route');
const chatRouter = require("./chat.route");
const userMiddleware = require("../../middlewares/client/user.middleware");
const settingMiddleware = require("../../middlewares/client/settings.middlewares");

module.exports = (app) => {
    app.use(categoryMiddleware.category);

    app.use(cartMiddleware.cartId);
    
    app.use(userMiddleware.infoUser);

    app.use(settingMiddleware.settingGeneral);

    app.use("/", homeRouter);

    app.use("/products", productRouter);

    app.use("/search", searchRouter);

    app.use("/cart", cartRouter);

    app.use("/checkout", checkoutRouter);
    
    app.use("/user", userRouter);

    app.use("/chat", chatRouter);
}
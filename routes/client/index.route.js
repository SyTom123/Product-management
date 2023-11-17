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
const authenticate = require("../../middlewares/client/auth.middlewares");
const usersRouter = require("./users.route");
const roomChatRouter = require("./roomChat.route");
const ordersRouter = require("./orders.router");


module.exports = (app) => {
    app.use(categoryMiddleware.category);

    app.use(cartMiddleware.cartId);
    
    app.use(userMiddleware.infoUser);

    app.use(settingMiddleware.settingGeneral);

    app.use("/", homeRouter);

    app.use("/products", productRouter);

    app.use("/search", searchRouter);

    app.use("/cart", cartRouter);

    app.use("/checkout",authenticate.requireAuth, checkoutRouter);
    
    app.use("/user", userRouter);

    app.use("/users",authenticate.requireAuth, usersRouter);

    app.use("/chat",authenticate.requireAuth, chatRouter);

    app.use("/rooms-chat",authenticate.requireAuth, roomChatRouter);

    app.use("/orders", authenticate.requireAuth, ordersRouter);
}
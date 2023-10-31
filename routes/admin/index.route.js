const systemConfig = require('../../config/system')
const dashboardRoutes = require('./dashboard.route');
const productRoutes = require('./product.route')
const productCategoryRoutes = require('./product-category.route');
const roleRoutes = require("./role.route");
const accountsRoutes = require('./accounts.route');
const authRoutes = require('./auth.route');
const settingRoutes = require("./setting.route");
const myAccountRoutes = require("./my-account.route");
const userRoutes = require('./user.route');
const authMiddleware = require("../../middlewares/admin/auth.middlewares");
const authController = require('../../controllers/admin/auth.controller');

module.exports = (app) => {
    const PATH_ADMIN = '/' + systemConfig.prefix_admin;

    app.get(PATH_ADMIN , authController.login);

    app.use(PATH_ADMIN + "/dashboard",authMiddleware.requireAuth, dashboardRoutes);

    app.use(PATH_ADMIN + "/product-category", authMiddleware.requireAuth, productCategoryRoutes);

    app.use(PATH_ADMIN + "/products", authMiddleware.requireAuth, productRoutes);

    app.use(PATH_ADMIN + "/roles", authMiddleware.requireAuth, roleRoutes);

    app.use(PATH_ADMIN + "/accounts",authMiddleware.requireAuth, accountsRoutes);
    
    app.use(PATH_ADMIN + "/my-account",authMiddleware.requireAuth, myAccountRoutes);

    app.use(PATH_ADMIN + "/settings",authMiddleware.requireAuth, settingRoutes);

    app.use(PATH_ADMIN + "/users",authMiddleware.requireAuth, userRoutes);

    app.use(PATH_ADMIN + "/auth", authRoutes);

}
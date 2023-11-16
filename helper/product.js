const formatMoneyHelper = require("./formatMoney");
module.exports.priceNewProduct = (products) => {
    const newProducts = products.map (item => {
        item.priceNew = formatMoneyHelper.formatMoney (((item.price * (100 - item.discountPercentage)) / 100).toFixed());
        item.priceOld = formatMoneyHelper.formatMoney(item.price);
        return item;
    })
    return newProducts;
}
module.exports.newPrice = (product) => {
    const priceNew = ((product.price * (100 - product.discountPercentage)) / 100).toFixed(0);
    return formatMoneyHelper.formatMoney(priceNew);
}
const formatMoneyHelper = require("./formatMoney");
module.exports.priceNewProduct = (products) => {
    const newProducts = products.map (item => {
        item.priceNewFormatVND = formatMoneyHelper.formatMoney (((item.price * (100 - item.discountPercentage)) / 100).toFixed());
        item.priceOld = formatMoneyHelper.formatMoney(item.price);
        item.priceNew= ((item.price * (100 - item.discountPercentage)) / 100).toFixed();
        return item;
    })
    return newProducts;
}
module.exports.newPriceFormatVND = (product) => {
    const priceNew = ((product.price * (100 - product.discountPercentage)) / 100).toFixed(0);
    return formatMoneyHelper.formatMoney(priceNew);
}
module.exports.newPrice = (product) => {
    const priceNew = ((product.price * (100 - product.discountPercentage)) / 100).toFixed(0);
    return priceNew;
}
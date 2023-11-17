const Product = require('../../models/product.model');
const ProductCategory = require("../../models/product-category.model");
const productsHelper = require("../../helper/product");
const formatMoneyHelper = require("../../helper/formatMoney");

// [GET] /product
module.exports.index = async (req, res) => {

    const products = await Product.find({
        deleted: false,
        status: "active"
    }).sort({position: "desc"});
    
    const newProducts = productsHelper.priceNewProduct(products);
    res.render("client/pages/products/index.pug", {
        pageTitle: "Danh sách sản phẩm",
        products: newProducts
    })
}
// [GET] /products/detail/:slugProduct

module.exports.detail = async (req, res) => {
    try {
        const slug = req.params.slugProduct;
        const product = await Product.findOne({
            slug: slug,
            deleted: false,
            status: "active"
        });

        if(!product) {
            return res.redirect("/products");
        }

        const viewed = product.viewed ?? 0;
        const title = product.title;
   
        const viewedUpdate = viewed + 1;
        await Product.updateOne({slug: slug}, {
            viewed: viewedUpdate
        })
        
        if(product.product_category_id) {
            const category = await ProductCategory.findOne({
                _id: product.product_category_id,
                deleted: false,
                status: "active"
            })
            product.category = category;
        }
        product.priceNew = productsHelper.newPrice(product);
        product.priceOld = formatMoneyHelper.formatMoney(product.price);
        product.priceNewFormatVND = formatMoneyHelper.formatMoney( product.priceNews)

        res.render("client/pages/products/detail", {
            pageTitle: "Chi tiết sản phẩm",
            product: product
        });

    } catch (error) {
        res.redirect("/");
    }
}
// [GET] / products/:slugCategory
module.exports.category = async (req, res) => {
    const slugCategory = req.params.slugCategory;

    const category = await ProductCategory.findOne({
        slug:slugCategory,
        deleted: false,
        status: "active"
    });

    const getSubCategory = async(parentId) => {
        const subs = await ProductCategory.find({
            parent_id: parentId,
            status: "active",
            deleted: false
        });
        
        let allSub = [...subs];

        for(const sub of subs){
            const childs = await getSubCategory(sub.id) ;
            allSub.concat(childs);
        }

        return allSub;
    }

    const listSubCategory = await getSubCategory(category._id);

    const listSubCategoryId = listSubCategory.map(item => item.id);

    const products = await Product.find({
        product_category_id: {$in:[category.id, ...listSubCategoryId] },
        status: "active",
        deleted: false
    }).sort({ position: "desc" });
    
    const newProducts = productsHelper.priceNewProduct(products);

    res.render("client/pages/products/index", {
        pageTitle: category.title,
        products: newProducts
    });
}
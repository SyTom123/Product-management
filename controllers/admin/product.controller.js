const Product = require('../../models/product.model');
// [GET] /admin/product
module.exports.index = async (req, res) => {
    try {
        let filterStatus = [
            {
                name: "Tất cả",
                status: "",
                class: ""
            },
            {
                name: "Hoạt động",
                status:'active',
                class: ""
            },
            {
                name: "Dừng hoạt động",
                status: "inactive",
                class: ""
            },
        ]
        let find = {
            deleted: false,
        }
        if(req.query.status) {
            const index = filterStatus.findIndex(item => item.status == req.query.status);
            filterStatus[index].class = "active";
        } else {
            filterStatus[0].class = "active";
        }
        console.log(filterStatus);

        const products = await Product.find(find);

        res.render("admin/pages/products/index.pug", {
            pageTitle: "Danh sach san pham",
            products: products,
            filterStatus: filterStatus
        })
    } catch (error) {
        console.log(error)
    }
}

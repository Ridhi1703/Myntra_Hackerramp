const Product = require("../modules/product.js");
const wrapAsc = require("../utils/wrapAsc.js");

module.exports.randerHomePage =(req, res) => {
    res.render("templets/home.ejs");
}

module.exports.products=wrapAsc(async (req, res, next) => {
    const { cat } = req.params;
    const data = await Product.find({ ideal_for: cat });
    res.render("templets/women.ejs", { data })
})
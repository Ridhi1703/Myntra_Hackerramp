const Product=require("../modules/product.js");
const Post=require("../modules/posts.js");
const wrapAsc = require("../utils/wrapAsc.js");

module.exports.product=wrapAsc(async (req,res,next)=>{
    const {id}=req.params;
    const data=await Product.findById(id);
    const review=await Post.find({tag:id}).populate("owner");
    res.render("templets/product.ejs",{data,review})
})
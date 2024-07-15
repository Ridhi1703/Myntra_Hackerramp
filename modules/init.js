let { productData } = require("./data.js");
const mongoose = require("mongoose");
const Product=require("./product.js")
const Post=require("./posts.js")
const main = async () => {
    await mongoose.connect(process.env.ATLASURL);
  }
main().then(() => {
    console.log("Connected....")
}).catch((err) => {
    console.log(err);
})


const initialize = async () => {
    await Product.deleteMany({});
    const data=await Product.insertMany(productData);

console.log(data);
}

initialize().catch((err) => {
    console.log(err);
})
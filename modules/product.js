const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    crawl_timestamp: {
        type: Date,
        // required: true
    },
    product_id: {
        type: Number,
        // required: true
    },
    link: {
        type: String,
        // required: true
    },
    size: {
        type: String
    },
    variant_sku: {
        type: String,
        // required: true
    },
    brand: {
        type: String,
        // required: true
    },
    care_instructions: {
        type: String
    },
    dominant_material: {
        type: String
    },
    title: {
        type: String,
        // required: true
    },
    actual_color: {
        type: String
    },
    dominant_color: {
        type: String
    },
    product_type: {
        type: String,
        // required: true
    },
    images: {
        type: String // Assuming multiple image URLs are stored as an array of strings
    },
    body: {
        type: String
    },
    product_details: {
        type: String
    },
    size_fit: {
        type: String
    },
    complete_the_look: {
        type: String
    },
    type: {
        type: String
    },
    variant_price: {
        type: Number
    },
    variant_compare_at_price: {
        type: Number
    },
    ideal_for: {
        type: String
    },
    is_in_stock: {
        type: String
    },
    inventory: {
        type: String
    },
    specifications: {
        type: String
    },
    FIELD26: {
        type: String // Replace FIELD26 with an appropriate field name if possible
    },
    
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;






// let { productData } = require("./data.js");
// const mongoose = require("mongoose");

// const main = async () => {
//     await mongoose.connect('mongodb+srv://ghumarevaishnavib:<password>@cluster0.v0wff7t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
// }
// main().then(() => {
//     console.log("Connected....")
// }).catch((err) => {
//     console.log(err);
// })


// const initialize = async () => {
//     await SampleListing.deleteMany({});
// //    initdata= initdata.map((obj) => ({
// //         ...obj,
// //        owner: "65e8b3fffdc903d86e01648c"
// //     }))
// //     await SampleListing.insertMany(initdata);
//     const data = SampleListing.find({});
// console.log(data);
// }

// initialize().catch((err) => {
//     console.log(err);
// })
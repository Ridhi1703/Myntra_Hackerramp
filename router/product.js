const express = require("express");
const router = express.Router({ mergeParams: true });
const path = require("path");
router.use(express.static(path.join(__dirname, "/public")));
router.use(express.urlencoded({ extended: true }));
const productController=require("../controllers/product.js");

router.get("/product/:id",productController.product);

module.exports=router;
const express = require("express");
const router = express.Router({ mergeParams: true });
const path = require("path");
router.use(express.static(path.join(__dirname, "/public")));
router.use(express.urlencoded({ extended: true }));
const landingController=require("../controllers/landing.js");

router.get("/", landingController.randerHomePage);

router.get("/catalogue/:cat", landingController.products);


module.exports = router;
const express = require("express");
const router = express.Router({ mergeParams: true });
const middlewaresUser=require("../middleware.js");
const passport = require("passport");
const path = require("path");
router.use(express.static(path.join(__dirname, "/public")));
router.use(express.urlencoded({ extended: true }));
const userController=require("../controllers/user.js");

router.get("/signin",userController.randerSigninForm);

router.post("/signin", middlewaresUser.redirecturl,passport.authenticate("local", { failureRedirect: "/user/signin", failureFlash: true }),userController.signin)

router.get("/register", userController.randerRegisterForm);

router.post("/register", userController.register);

router.get("/logout",userController.logout);

module.exports=router;

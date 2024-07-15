const express = require("express");
const router = express.Router({ mergeParams: true });
const middlewaresUser=require("../middleware.js");
const {storage}=require("../strogeConfi.js");
const multer  = require('multer')
const path = require("path");
router.use(express.static(path.join(__dirname, "/public")));
const upload = multer({ storage:storage });
router.use(express.urlencoded({ extended: true }));
const profileController=require("../controllers/profile.js");

router.get("/profile",profileController.profile);

router.get("/profile/:username",middlewaresUser.isLoggedIn,profileController.randerProfile);

router.get("/follow/:username",middlewaresUser.isLoggedIn,middlewaresUser.isSameUser,profileController.follow);

router.get("/unfollow/:username",middlewaresUser.isLoggedIn,middlewaresUser.isSameUser,profileController.unfollow);

router.get("/profile_edit/:username",middlewaresUser.isLoggedIn,middlewaresUser.isAuthUser,profileController.randerEditProfileForm);

router.post("/profile_edit/:username",middlewaresUser.isLoggedIn,middlewaresUser.isAuthUser,upload.single('profile_photo'),profileController.editProfile);

module.exports=router;

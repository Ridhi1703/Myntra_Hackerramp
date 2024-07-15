const express = require("express");
const router = express.Router({ mergeParams: true });
const middlewaresUser = require("../middleware.js");
const { storage } = require("../strogeConfi.js");
const multer = require('multer')
const upload = multer({ storage: storage });
const path = require("path");
router.use(express.static(path.join(__dirname, "/public")));
router.use(express.urlencoded({ extended: true }));

const postController=require("../controllers/post.js");

router.get("/create_post/:username", middlewaresUser.isLoggedIn, middlewaresUser.isAuthUser, postController.randerCreatePostForm);

router.post("/create_post/:username", middlewaresUser.isLoggedIn, middlewaresUser.isAuthUser,upload.single('image'),postController.createPost);


router.get("/show_post/:post_id", postController.showPost);

module.exports = router;

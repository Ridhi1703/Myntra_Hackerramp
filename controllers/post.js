const Users = require("../modules/user.js");
const Post = require("../modules/posts.js");
const Product = require("../modules/product.js");
const wrapAsc = require("../utils/wrapAsc.js");

module.exports.randerCreatePostForm=wrapAsc(async (req, res, next) => {
    const { username } = req.params;
    const user = await Users.findOne({ username: username });
    if (!user) {
        req.flash("error", `${username} does't exits`);
        return res.redirect("/");
    }
    res.render("templets/create_post", { user });
})

module.exports.createPost= wrapAsc(async (req, res, next) => {
    const { username } = req.params;
    const user = await Users.findOne({ username: username });
    if (!user) {
        req.flash("error", `${username} does't exits`);
        return res.redirect(`/profile/${username}`);
    }
    let newPost = new Post(req.body);
    let filename = req.file.filename;
    let url = req.file.path;
    const prduct_id = req.tag;
    const product = await Product.findById(prduct_id);

    newPost.owner = user._id;
    newPost.image = { filename, url };
    await newPost.save()
    user.post.push(newPost);
    await user.save();
    req.flash('success', 'new post added sucessfully');
    res.redirect(`/profile/${username}`);
})

module.exports.showPost=async (req, res) => {
    const { post_id } = req.params;
    const post = await Post.findById(post_id).populate('owner');
    res.render("templets/show_post.ejs", { post });
}
const ExpressError=require("./utils/expressError");
const Post=require("./modules/posts");
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "you must loged in");
        res.redirect("/user/signin");
    } else {
        next();
    }
}

module.exports.redirecturl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
       
    } else {
        res.locals.redirectUrl = "/";
    }
     next();
}


module.exports.isAuthUser=(req,res,next)=>{
    const {username}=req.params;
    if(req.user.username===username){
        return next();
    }
    req.flash("error", "you cann't access this page");
    res.redirect("/");
}


module.exports.isOwner=async(req,res,next)=>{
    const {id}=req.params;
    const post=await Post.findById(id);
    if(post._id.equals(req.user._id)){
        return next();
    }
    req.flash("error", "you are not author of this post");
    res.redirect("/");
}

module.exports.isSameUser=async(req,res,next)=>{
    if(req.user.username===req.params.username){
        return res.redirect(`/profile/${req.user.username}`);
    }
    return next();
}
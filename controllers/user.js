
const Users=require("../modules/user.js");
const wrapAsc = require("../utils/wrapAsc.js");


module.exports.randerSigninForm= (req, res) => {
    res.render("templets/signin.ejs");
}

module.exports.signin=(req, res) => {
    req.flash("success", "login successfully")
    res.redirect(res.locals.redirectUrl);
}

module.exports.randerRegisterForm=(req, res) => {
    res.render("templets/register.ejs");
}

module.exports.register=wrapAsc(async(req, res) => {
    try {
        let { username, phonenumber,email, password } = req.body;
        const newUser = new Users({
            email: email,
            phonenumber:phonenumber,
            username: username,
            following_count:0,
            followers_count:0,
            post_count:0,  
        })
        const registeredUser = await Users.register(newUser, password);
        req.flash("success", "register successfully")
        req.login(registeredUser, (err) => {
            if (err) {
                req.flash("error", err.message);
                console.log(err);
                res.redirect("/user/register");
            }
            res.redirect("/");
        })
    }
    catch (err) {
        req.flash("error", err.message);
        console.log(err);
        res.redirect("/user/register");
    }
})

module.exports.logout=(req, res, next) => {
    req.logOut((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "logout successfully");
        res.redirect("/")
    })
}


require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
const ejs=require('ejs');
const engine = require('ejs-mate');
const path = require("path");
const mongoose = require("mongoose");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const sessions = require("express-session");
const MongoStore = require('connect-mongo');
const flash=require("connect-flash");
const Users=require("./modules/user.js");
const landingRoute = require("./router/landing.js");
const productRoute = require("./router/product.js");
const userRoute = require("./router/user.js");
const profileRoute = require("./router/profile.js");
const postRoute = require("./router/post.js");
const ExpressError = require("./utils/expressError.js");


const main = async () => {
  await mongoose.connect(process.env.ATLASURL);
}
main().then(() => {
  console.log("Connected....")
}).catch((err) => {
  console.log(err);
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})


app.set("view engine", "views");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.engine('ejs', engine);
app.set('view engine', 'ejs');

const store= MongoStore.create({
  mongoUrl:process.env.ATLASURL,
  crypto: {
      secret:  'vaishnavisSuperSecret'
    },
    touchAfter:24*3600
})

store.on("error",(err)=>{
  console.log("ERROR IN SESSION STORE",err);
}) 
const sessionOptions = {
  store:store,
  secret: 'vaishnavisSuperSecret',
  resave: false,
  saveUninitialized: true,
  cookie: {
      expires: Date.now() + 1000 * 60 * 60 * 24,
      maxAge: Date.now() + 1000 * 60 * 60 * 24,
      httpOnly: true
  }
}
app.use(sessions(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(Users.authenticate()));
passport.serializeUser(Users.serializeUser());
passport.deserializeUser(Users.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
})

app.use("/",landingRoute);
app.use("/",productRoute);
app.use("/user",userRoute);
app.use("/",postRoute);
app.use("/",profileRoute);


app.all("*", (req, res, next) => {
  throw new ExpressError(404, "Page not found");
  next(err);
})

app.use((err, req, res, next) => {
  let { status = 500, message = "Somthing going to be wrong" } = err;
  res.render("templets/error.ejs", { message });
})




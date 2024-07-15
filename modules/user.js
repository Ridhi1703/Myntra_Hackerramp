const mongoose = require("mongoose");
const passportLocalMongoose=require("passport-local-mongoose");
const Post=require("../modules/posts.js");
// const Users=require("../modules/user.js");

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    profile_photo: {
        filename: {
            type: String,
        },
        url: {
            type: String,
            default: "",
            set: (v) => v === "" ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" : v
        },
    },
    name:{
        type:String,
    },
    bio:{
        type:String,
    },
    phonenumber:{
        type:Number,
        required:true,
        min:1000000000,
        max:9999999999
    },
    following_count:{
        type:Number,
        min:0,
        required:true,
    },
    followers_count:{
        type:Number,
        min:0,
        required:true,
    },
    post_count:{
        type:Number,
        min:0,
        required:true,
    },
    post:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],
    followers:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    following:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
})


userSchema.post("findOneAndDelete", async (user) => {
    if (luser) {
        let res = await Post.deleteMany({ _id: { $in: listing.post } });
    }
})

userSchema.plugin(passportLocalMongoose);
const User = mongoose.model("User", userSchema);
module.exports = User;
const mongoose = require('mongoose');
const User = require('./user.js');
const Schema = mongoose.Schema;
const postSchema = {
    tag: {
        type: String,
        required: true
    },
    image: {
        filename: {
            type: String,
        },
        url: {
            type: String,
            default: "",
            set: (v) => v === "" ? "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhY2glMjBob3VzZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60" : v
        },
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    caption: {
        type: String,
        required: true
    },            
    likes: {
        type: Number,
        min: 0,
        default:0
    },
    dislike: {
        type: Number,
        min: 0,
        default:0
    },
    created_at: {
        type: Date,
        default: Date.now()
    } ,
    rating:{
        type:Number,
        min:1,
        max:5,
        default:1
    }         
}
const Post = mongoose.model("Post", postSchema);
module.exports=Post;
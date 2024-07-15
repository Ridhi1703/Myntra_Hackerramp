const Users=require("../modules/user.js");
const wrapAsc = require("../utils/wrapAsc.js");

module.exports.profile=(req,res,next)=>{
    if(!req.user){
        return res.redirect("/user/signin");
    }else{
       return  res.redirect(`/profile/${req.user.username}`);
    }
}

module.exports.randerProfile=async(req,res,next)=>{
    const {username}=req.params;
    const user=await Users.findOne({username:username}).populate('post');
    res.render("templets/profile",{user});
}

module.exports.follow=async(req,res)=>{
    const {username}=req.params;
    const owner=req.user;
    const friend=await Users.findOne({username:username});
    await Users.findOneAndUpdate({username:username},{followers_count:friend.followers_count+1});
    await Users.findOneAndUpdate({username:owner.username},{following_count:owner.following_count+1});
    friend.followers.push(owner);
    await friend.save();
    owner.following.push(friend);
    await owner.save();
    res.redirect(`/profile/${username}`);
}

module.exports.unfollow=async(req,res)=>{
    const {username}=req.params;
    const owner=req.user;
    const friend=await Users.findOne({username:username});
    let followers=friend.followers_count==0 ? 0 : friend.followers_count-1
    let following=owner.following_count==0 ? 0 : owner.following_count-1
    await Users.findOneAndUpdate({username:username},{followers_count:followers});
    await Users.findOneAndUpdate({username:owner.username},{following_count:following});
    res.redirect(`/profile/${username}`);
}

module.exports.randerEditProfileForm=async(req,res,next)=>{
    const {username}=req.params;
    const user=await Users.findOne({username:username});
    res.render("templets/edit_profile.ejs",{user});
}

module.exports.editProfile=wrapAsc(async(req,res,next)=>{
    const {username}=req.params;
    const user=await Users.findOne({username:username});
    
    if (!user) {
        req.flash('error', 'profile you want to edit does not exit');
        res.redirect("/");
    } else {
        await Users.findByIdAndUpdate(user._id, { ...req.body }, { runValidators: true });
        if (req.file) {
            let filename = req.file.filename;
            let url = req.file.path;
            await Users.findByIdAndUpdate(user._id, { profile_photo: { filename, url } })
        }
        
        req.flash('success', 'Profile edited sucessfully');
        res.redirect(`/profile/${user.username}`);
    }
    
})
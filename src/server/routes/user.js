const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middleware/requirelogin')
const Post = mongoose.model("Post")
const User = mongoose.model("User")

router.get('/user/:id',requireLogin,(req,res)=>{
    User.findOne({_id:req.params.id})
    .select("-password")
    .then(User=>{
        Post.find({postedBy:req.params.id})
        .populate("postedBy","_id name")
        .then((posts)=>{
            if(!posts){
                return res.status(402).json({error:" user not found"})
            }
                res.json({User,posts})
        })
    })
    .catch(err=>{
        return res.status(404).json({error:"user not found"})
    })
})

router.put('/follow', requireLogin, (req, res) => {
    User.findByIdAndUpdate(req.body.followId, {
      $push:{followers: req.user._id }
    }, {
      new: true
    })
    .then(result => {
      User.findByIdAndUpdate(req.user._id, {
        $push: { following: req.body.followId }
      }, {
        new: true
      })
      .select("-password")
      .then(resulte => {
        res.json({ resulte })
      })
      .catch(err => {
        return res.status(422).json({ error: err })
      })
    })
    .catch(err => {
      return res.status(422).json({ error: err })
    })
  })

  
router.put('/unfollow', requireLogin, (req, res) => {
    User.findByIdAndUpdate(req.body.unfollowId, {
      $pull:{followers: req.user._id }
    }, {
      new: true
    })
    .then(result => {
      User.findByIdAndUpdate(req.user._id, {
        $pull: { following: req.body.unfollowId }
      }, {
        new: true
      })
      .select("-password")
      .then(resulte => {
        res.json({ resulte })
      })
      .catch(err => {
        return res.status(422).json({ error: err })
      })
    })
    .catch(err => {
      return res.status(422).json({ error: err })
    })
  })
  
router.put('/updateprofile',requireLogin,(req,res)=>{
  User.findByIdAndUpdate(req.user._id,{
    $set:{profileImage:req.body.pic}
  },
  {new:true})
  .then(resulte => {
    res.json({ resulte })
  })
  .catch(err => {
    return res.status(422).json({ error: err })
  })
})
module.exports = router
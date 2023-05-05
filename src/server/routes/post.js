const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middleware/requirelogin')
const Post = mongoose.model("Post")

router.post('/createpost',requireLogin,(req,res)=>{
    const{title,body,pic}=req.body
    if(!title || !body || !pic){
       return res.status(402).json({error:"please add all feilds"})
    }

    const post = new Post({
        title,
        body,
        photo:pic,
        postedBy:req.user
    })
    post.save().then(result=>{
        res.json({post:result})
    })
    .catch(err=>{
        console.log(err)
    })

})

router.get('/allpost',requireLogin,(req,res)=>{
    Post.find()
    .populate("postedBy","_id name profileImage")
    .populate("comments.postedBy","_id name")
    // .populate("likes.postedBy","_id name")

    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/getsubspost',requireLogin,(req,res)=>{
    Post.find({postedBy:{$in:req.user.following}})
    .populate("postedBy","_id name")
    .populate("comments.postedBy","_id name")
    // .populate("likes.postedBy","_id name")

    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/mypost',requireLogin,(req,res)=>{
    Post.find({postedBy:req.user._id})
    .populate("postedBy","_id name nickname")
    .then(mypost=>{
        res.json({mypost})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.put('/like', requireLogin, (req, res) => {
    Post.findByIdAndUpdate(req.body.postId, {
      $push: { likes: req.user._id }
    }, { 
        new: true
     })
     .populate("postedBy","_id name")
     .then(result => {
      res.json(result);
    })
    .catch(error => {
      res.status(402).json({ error: error });
    });
  });

router.put('/unlike', requireLogin, (req, res) => {
    Post.findByIdAndUpdate(req.body.postId, {
      $pull: { likes: req.user._id }
    }, { 
        new: true
     })
     .populate("postedBy","_id name")
     .then(result => {
      res.json(result);
    })
    .catch(error => {
      res.status(402).json({ error: error });
    });
  });

router.put('/comment', requireLogin, (req, res) => {
    const comment={
      text:req.body.text,
      postedBy:req.user._id
    }
    Post.findByIdAndUpdate(req.body.postId, {
      $push: {comments:comment}
    }, { 
        new: true
     })
     .populate("comments.postedBy","_id name")
     .populate("postedBy","_id name")
     .then(result => {
      res.json(result);
    })
    .catch(error => {
      res.status(402).json({ error: error });
    });
  });

  router.delete('/deletepost/:postId', requireLogin, (req, res) => {
    Post.findOne({ _id: req.params.postId })
      .populate("postedBy", "_id")
      .then((post) => {
        if (!post) {
          return res.status(402).json({ error: "Post not found" });
        }
  
        if (post.postedBy._id.toString() === req.user._id.toString()) {
          Post.deleteOne({ _id: post._id })
            .then((result) => {
              res.json(result);
            })
            .catch((err) => {
              console.error(err);
              res.status(500).json({ error: "Internal server error" });
            });
        }
      })
  })
  


module.exports = router
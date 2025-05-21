const express = require("express");
const app = express.Router();
const User = require("../models/user.model");
const Post = require("../models/post.model");
const authentication = require("../middlewares/authentication");

// GET ALL THE POST
app.get("/all", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({ categories: { $in: [catName] } });
    } else {
      posts = await Post.find();
    }

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET THE POST
app.get("/:id", authentication, async (req, res) => {
  console.log(req.user_.id, ":req.user_.id");
  const postId = req.params.id;
  console.log(postId,'postIdpostId');
  try {
    const post = await Post.find({ _id: postId });
    res.send({ success: true, msg: post });
    console.log(post, "post of single user.");
  } catch (err) {
    res.status(500).json({ success: false, msg: err });
    console.log(err, "err is getting single user post.");
  }
});

//CREATE
app.post("/create", authentication, async (req, res) => {
  const { title, desc, username } = req.body;

  if (!title || !desc) {
    return res
      .status(400)
      .json({ success: false, message: "Title and descrition are required" });
  }
  console.log(req.userId, "req.userId");
  const newPost = new Post({
    title,
    desc,
    username,
    userId: req.userId,
  });

  try {
    const savedPost = await newPost.save();

    res.status(200).json({
      success: true,
      message: "Post created successfully",
      data: savedPost,
    });
  } catch (err) {
    console.error("Error creating post:", err);
    res.status(500).json({
      success: false,
      message: "Error saving post",
      error: err.message,
    });
  }
});

//UPDATE POST
app.put("/update/:id", authentication, async (req, res) => {
  const postId = req.params.id;
  console.log(postId,'postId');
  try {
    const post = await Post.findById({_id: postId});
    console.log(post, "postpostpostpost");
    post.title = req.body.title;
    post.desc = req.body.desc;
   const updatedPost= await post.save();
    
    res.send({ success: true, msg: "Updated Successfully", msg:updatedPost });
    console.log(updatedPost, ":their is updated post");
  } catch (err) {
    res.status(500).json({ success: false, msg: err });
  }
});

// DELETE
app.delete("/delete/:id", authentication, async (req, res) => {
  const postId=req.params.id;
  console.log(postId,'delete postid');
  try {
    await Post.findByIdAndDelete({ _id: postId });
    res.send({ success: true, status: 200, msg: "Deleted Successfully" });
    console.log("delete successfully.");
  } catch (err) {
    res.status(500).json({ success: false, msg: err });
  }
});

// GET ALL MY POST
app.get("/mypost/posts", authentication, async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.userId });
    res.send({ success: true, msg: posts });
    console.log(posts, "posts");
  } catch (err) {
    res
      .status(500)
      .json({ success: false, error: "Something went wrong", details: err });
    console.log(err, "error in getting my post");
  }
});

module.exports = app;

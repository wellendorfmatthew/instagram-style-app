// TODO: Set up controllers for post routes
const { Instagram, Comment } = require('../models/Post');
const mongoose = require('mongoose');

// GET all posts
const getPosts = async (req, res, next) => {
    const posts = await Instagram.find({}).sort({createdAt: -1});
    res.status(200).json(posts);
}

// GET a post
const getPost = async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) { // Check if id is valid
        return res.status(404).json({error: 'Post does not exist'});
    }
    const post = await Instagram.findById(id);

    if (!post) {
        return res.status(404).json({error: 'Post does not exist'});
    }

    res.status(200).json(post);
}

// CREATE a post
const createPost = async (req, res, next) => {
    const { username, likes, post, image, comments } = req.body;

    try {
        const makePost = await Instagram.create({username, likes, post, image, comments});
        res.status(200).json(makePost);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

// UPDATE a post
const updatePost = async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) { // Check if id is valid
        return res.status(404).json({error: 'Post does not exist'});
    }
    const post = await Instagram.findByIdAndUpdate(id, {...req.body});

    if (!post) {
        return res.status(404).json({error: 'Post does not exist'});
    }

    res.status(200).json(post);
}

// DELETE a psot
const deletePost = async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) { // Check if id is valid
        return res.status(404).json({error: 'Post does not exist'});
    }
    const post = await Instagram.findByIdAndDelete(id);

    if (!post) {
        return res.status(404).json({error: 'Post does not exist'});
    }

    res.status(200).json(post);
}

// GET comments
const getComments = async (req, res, next) => {
    const { postID } = req.params;

    if (!mongoose.Types.ObjectId.isValid(postID)) { // Check if id is valid
        return res.status(404).json({error: 'Post does not exist containing comments'});
    }
    const post = await Instagram.findById(postID);

    if (!post) {
        return res.status(404).json({error: 'Post does not exist containing comments'});
    }

    res.status(200).json(post.comments);
}

// GET comment
const getComment = async (req, res, next) => {
    const { postID, id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(postID) || !mongoose.Types.ObjectId.isValid(id)) { // Check if id is valid
        return res.status(404).json({error: 'Post or comment does not exist'});
    }
    
    try {
        const post = await Instagram.findById(postID);
        if (!post) {
            return res.status(404).json({error: 'Post does not exist'});
        }

        const comment = post.comments.find(comm => comm._id.equals(id)); // Use the array find method to look through the array to find the comment
        if (!comment) {
            return res.status(404).json({error: 'Comment does not exist'});
        }

        //const comment = await Comment.findById(id);
        //console.log("This is the comment", comment);

        res.status(200).json(comment);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

// CREATE new comment
const postComment = async (req, res, next) => {
    const { postID } = req.params;
    const { username, post } = req.body;

    if (!mongoose.Types.ObjectId.isValid(postID)) { // Check if id is valid
        return res.status(404).json({error: 'Post or comment does not exist'});
    }

    try {
        const newPost = await Instagram.findById(postID);

        if (!newPost) {
            return res.status(404).json({error: 'Post or comment does not exist'});
        }

        const newComment = {
            username: username,
            post: post
        };

        newPost.comments.push(newComment);
        await newPost.save();
        console.log(req.path, req.method);

        res.status(200).json(newPost); // TODO: Might change later to just show new comment
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

// DELETE a comment
const deleteComment = async (req, res, next) => {
    const { postID, id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(postID) || !mongoose.Types.ObjectId.isValid(id)) { // Check if id is valid
        return res.status(404).json({error: 'Post or comment does not exist'});
    }
    
    try {
        const post = await Instagram.findById(postID);
        if (!post) {
            return res.status(404).json({error: 'Post does not exist'});
        }

        const comment = post.comments.find(comm => comm._id.equals(id)); // Use the array find method to look through the array to find the comment

        if (!comment) {
            return res.status(404).json({error: 'Comment does not exist'});
        }

        const commentIndex = post.comments.indexOf(comment);

        if (commentIndex === -1) {
            return res.status(404).json({ error: 'Comment does not exist' });
        }

        post.comments.splice(commentIndex, 1);
        await post.save(); // Saves the modified post since mongoose doesnt track changes to arrays or subdocuments 

        res.status(200).json(comment);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

module.exports = {
    getPost,
    getPosts,
    updatePost,
    deletePost,
    createPost,
    getComments,
    getComment,
    postComment,
    deleteComment
}
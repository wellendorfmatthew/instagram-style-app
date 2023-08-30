// TODO: Set up code to establish routes for posts
const express = require('express');
const {
    getPosts,
    getPost,
    deletePost,
    updatePost,
    createPost,
    getComments,
    getComment,
    postComment,
    deleteComment
} = require('../controllers/postControllers');

const router = express.Router();

// GET all posts
router.get('/', getPosts);

// GET a post
router.get('/:id', getPost);

// Make a post
router.post('/', createPost);

// Update a post
router.put('/:id', updatePost);

// DELETE a post
router.delete('/:id', deletePost);

// GET all comments
router.get('/:postID/comment', getComments);

// GET a comment
router.get('/:postID/comment/:id', getComment);

// POST a comment
router.post('/:postID/comment', postComment);

// DELETE a comment
router.delete('/:postID/comment/:id', deleteComment);

module.exports = router;
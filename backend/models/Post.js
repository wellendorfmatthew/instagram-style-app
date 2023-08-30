// TODO : Set up post database schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    post: {
        type: String,
        required: true
    }
});

const InstagramSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        required: true
    },
    post: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    comments: [CommentSchema]
});

const Instagram = mongoose.model('Instagram', InstagramSchema);
const Comment = mongoose.model('Comment', CommentSchema);
module.exports = {
    Instagram,
    Comment
}
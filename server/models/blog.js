let mongoose = require('mongoose');
//create blog post model
let postsModel = mongoose.Schema({
    username: String,
    title: String,
    category: String,
    description: String,
    postDate: Date,
    likes: Number,
    comments: String,
},
{
    collection: 'posts' //access the blog posts collection
});
module.exports = mongoose.model('Post', postsModel) //export the model so it can be used
let mongoose = require('mongoose');
//create blog post model
let postsModel = mongoose.Schema({
    username: String,
    pfp: { data: Buffer, contentType: String },
    title: String,
    category: String,
    text_content: String,
    photo_content: { data: Buffer, contentType: String },
    postDate: Date,
    likes: Number,
    comments: String,
},
{
    collection: 'posts' //access the blog posts collection
});
module.exports = mongoose.model('Post', postsModel) //export the model so it can be used
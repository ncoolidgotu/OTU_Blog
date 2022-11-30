/*Nate Coolidge - 100749708*/ 
/*Jaime Gonzalez Sanz - 100839804*/ 
/*Caleb Fontaine - 100832588 */
/*Saief Shams Murad - 100836639 */
/*Haekang Song -100625189 */

let mongoose = require('mongoose');
//create blog post model
let postsModel = mongoose.Schema({
    username: String,
    pfp: String,
    title: String,
    category: String,
    text_content: String,
    photo_content: String,
    postDate: Date,
    likes: Number,
    comments: String,
},
{
    collection: 'posts' //access the blog posts collection
});
module.exports = mongoose.model('Post', postsModel) //export the model so it can be used
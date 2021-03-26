const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const blogSchema = new Schema({
   title: {
      type: String,
      required: true
   },
   snippet: {
      type: String,
      required: true
   },
   body: {
      type: String,
      required: true
   }

}, { timestamps: true });

// it will automatically search for blogs(plural) collection:
const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog

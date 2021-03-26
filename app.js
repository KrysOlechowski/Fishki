const express = require("express")
const mongoose = require('mongoose')
const app = express()

const Blog = require('./models/blog')


// const dbUri = require('../secret.js')
const dbUri = "mongodb+srv://nodeuser:node123@cluster0.quzdq.mongodb.net/node?retryWrites=true&w=majority"
const PORT = process.env.PORT || 3003

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => {
      console.log("Connected to DB")
      app.listen(PORT, () => {
         console.log("Listening on PORT:3003")
      })
   }).catch((err) => console.log(err))

app.all('/*', function (req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "X-Requested-With");
   next();
});
//heroku xgf

// app.get('/add', (req, res) => {
//    const blog = new Blog({
//       title: "new blog",
//       snippet: "about new blog"
//       , body: "body about blog"
//    })

//    blog.save()
//       .then((result) => {
//          res.send(result)
//       }).catch((err) => {
//          console.log(err)
//       })
// })

app.get('/', (req, res) => {
   console.log("REQUEST! Main")
   Blog.find().then((result) => {
      res.send(result)
   }).catch((err) => {
      console.log(err)
   })
})

app.get('/blogs', (req, res) => {
   console.log("REQUEST! Blogs")
   Blog.find().then((result) => {
      res.send(result)
   }).catch((err) => {
      console.log(err)
   })
})

app.get('/single', (req, res) => {
   const id = "605a54e267ae914f2cdab9b6"
   Blog.findById(id).then((result) => {
      res.send(result)
      console.log(result)
   }).catch((err) => {
      console.log(err)
   })
})

// app.get('/', (req, res) => {
//    res.send('<p>LOL</p>')
// })

// app.get('/about', (req, res) => {
//    res.send('<p>about</p>')
// })

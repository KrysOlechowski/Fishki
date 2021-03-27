const express = require("express")
const mongoose = require('mongoose')
const app = express()
require("dotenv").config();
const Card = require('./models/card')

const DBUri = process.env.DBUri
const PORT = process.env.PORT || 3003


mongoose.connect(DBUri, { useNewUrlParser: true, useUnifiedTopology: true })
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

app.get('/cards', (req, res) => {
   console.log("REQUEST! cards")
   Card.find().then((result) => {
      res.send(result)
   }).catch((err) => {
      console.log(err)
   })
})


app.get('/add', (req, res) => {
   const card = new Card({
      title: "card title 2",
      front: "card front 2",
      back: "card front 2",
      status: "card status 2"
   })

   card.save()
      .then((result) => {
         console.log("CREATED!")
         res.send(result)
      }).catch((err) => {
         console.log(err)
      })
})



app.get('/findById', (req, res) => {
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

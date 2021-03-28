const express = require("express")
const mongoose = require('mongoose')
const app = express()
require("dotenv").config();
const Card = require('./models/card')

const DBUri = process.env.DBUri
const PORT = process.env.PORT || 3003

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


mongoose.connect(DBUri, { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => {
      console.log("Connected to DB")
      app.listen(PORT, () => {
         console.log("Listening on PORT:3003")
      })
   }).catch((err) => console.log(err))

app.all('/*', function (req, res, next) {
   res.setHeader("Access-Control-Allow-Origin", "*");
   res.setHeader("Access-Control-Allow-Credentials", "true");
   res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
   res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
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


app.post('/add', (req, res) => {
   const body = req.body

   const card = new Card({
      title: body.title,
      front: body.front,
      back: body.back,
      status: body.status
   })

   card.save()
      .then((result) => {
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


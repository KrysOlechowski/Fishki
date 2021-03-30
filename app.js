const express = require("express")
const mongoose = require('mongoose')
const app = express()
require("dotenv").config();
const Card = require('./models/card')
const CollectionsNames = require('./models/collections')

const DBUri = process.env.DBUri
const PORT = process.env.PORT || 3003
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

mongoose.connect(DBUri, { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => {
      console.log("Connected to DB")
      app.listen(PORT, () => {
         console.log("Listening on PORT:3003")
      })
   }).catch((err) => console.log(err))


app.get('/cards', (req, res) => {
   Card.find().then((result) => {
      res.send(result)
   }).catch((err) => {
      console.log(err)
   })
})

app.get('/collections', (req, res) => {
   CollectionsNames.find().then((result) => {
      res.send(result)
   }).catch((err) => {
      console.log(err)
   })
})

app.post('/collections', (req, res) => {
   const collectionName = req.body.name
   CollectionsNames.find().then((result) => {
      console.log(result)
      const collection = new CollectionsNames({
         names: [
            { collectionName: "trl" }
         ]
      })
      collection.save()
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


app.delete('/delete', (req, res) => {
   const body = req.body
   Card.deleteOne({ _id: body.cardId }).then((result) => {
      res.send(result)
   })
})

app.post('/update', (req, res) => {
   const body = req.body
   Card.updateOne({ _id: body.id },
      {
         ...body
      }).then((result) => {
         res.send(result)
      }).catch(err => {
         res.send(err)
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


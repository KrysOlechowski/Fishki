const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const cardSchema = new Schema({
   front: {
      type: String,
      required: true
   },
   back: {
      type: String,
      required: true
   },
   collectionName: {
      type: String,
      required: true
   },
   status: {
      type: String,
      required: true
   },
   goodAnswers: {
      type: Number,
      required: true
   },
   badAnswers: {
      type: Number,
      required: true
   }


}, { timestamps: true });

const cardCollection = process.env.NODE_ENV === "development" ? "Carddev" : "Card"

const Card = mongoose.model(cardCollection, cardSchema)

module.exports = Card

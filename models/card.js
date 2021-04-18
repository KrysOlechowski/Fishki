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
   goodAnswers:{
      type:Number,
      required:true
   },
   badAnswers:{
      type:Number,
      required:true
   }


}, { timestamps: true });

// it will automatically search for cards(plural) collection:
const Card = mongoose.model('Card', cardSchema)

module.exports = Card

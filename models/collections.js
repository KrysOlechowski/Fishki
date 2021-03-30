const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const collectionName = new Schema({ collectionName: String })

const collectionsSchema = new Schema({
   names: [collectionName]



}, { timestamps: true });

const CollectionsNames = mongoose.model('Collection', collectionsSchema)

module.exports = CollectionsNames

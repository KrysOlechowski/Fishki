const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const collectionsSchema = new Schema({
   names: [String]
}, { timestamps: true });

const CollectionsNames = mongoose.model('Collection', collectionsSchema)

module.exports = CollectionsNames

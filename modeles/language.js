const {Schema, model} = require('mongoose')
const language = new Schema({
    title: {
      type: String,
      default: ''
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
})
module.exports = model('Language',language)
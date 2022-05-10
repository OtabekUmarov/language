const {Schema, model} = require('mongoose')
const letter = new Schema({
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    languageId: {
      type: Schema.Types.ObjectId,
      ref: 'Language'
    },
})
module.exports = model('Letter',letter)
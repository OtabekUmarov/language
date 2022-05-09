const {Schema, model} = require('mongoose')
const text = new Schema({
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    languageId: {
      type: Schema.Types.ObjectId,
      ref: 'Language'
  },
})
module.exports = model('Text',text)
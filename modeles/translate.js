const {Schema, model} = require('mongoose')
const translate = new Schema({
    koreys: {
      type: String,
      default: ''
    },
    uzbek: {
      type: String,
      default: ''
    }
})
module.exports = model('Translate',translate)
const {Schema, model} = require('mongoose')
const test = new Schema({
    question: {
      type: String,
      default: ''
    },
    answers: {
      type: Array,
      default: []
    },
})
module.exports = model('Test',test)
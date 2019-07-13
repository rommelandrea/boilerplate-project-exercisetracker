const mongoose = require('mongoose')

const exerciceSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  description: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  date: Date,
})

module.exports = mongoose.model('Exercice', exerciceSchema)

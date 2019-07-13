const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  exercices: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exercice' }]
})

module.exports = mongoose.model('User', userSchema)

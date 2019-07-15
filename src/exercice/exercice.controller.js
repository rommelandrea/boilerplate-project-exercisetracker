const Exercice = require('./exercice.model')
const User = require('../user/user.model')
const mongoose = require('mongoose')

class ExerciceController {
  constructor() {}

  async saveExercice(obj) {
    if (mongoose.Types.ObjectId.isValid(obj.userId)) {
      console.log('id ok')
    } else {
      console.error('id not valid')
    }

    User.findOne({ _id: obj.userId }).exec((err, user) => {
      console.log('user: ')
      console.log(user)

      if (user) {
        console.log('user id: ' + user._id)

        let exercice = new Exercice({
          date: new Date(obj.date),
          description: obj.description,
          duration: obj.duration,
          userId: user._id,
        })

        exercice
          .save()
          .then(data => {
            console.log(data)
          })
          .catch(err => {
            console.log(err)
          })

        user.exercices = [...user.exercices, exercice._id]
        user.save().catch(err => {
          console.err(err)
        });
      } else {
        console.err('user id not exist')
      }
    })
  }

  async findAll() {
    let exercices = Exercice.find().populate('user')
    return exercices
  }
}

module.exports = ExerciceController

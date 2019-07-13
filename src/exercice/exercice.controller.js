const Exercice = require('./exercice.model')

class ExerciceController {
  constructor() {}

  async saveExercice(obj) {

    let ex = {}
    ex.date = new Date(obj.date)
    ex.userId = obj.userId
    ex.description = obj.description
    ex.duration = obj.duration

    console.log(ex)

    let exercice = new Exercice(ex)
    exercice.save()

    return exercice
  }

  async findAll() {
    let exercices = Exercice.find()
      .populate('user')
    return exercices
  }
}

module.exports = ExerciceController

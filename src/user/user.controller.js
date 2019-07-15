const User = require('./user.model')

class UserController {
  constructor() {}

  async saveUser(username) {
    let user = new User({username: username})
    user.save()

    return user
  }

  async findAll() {
    let users = User.find().populate({path: 'exercices'});
    return users
  }
}

module.exports = UserController

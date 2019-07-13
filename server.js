require('dotenv').config()

const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const cors = require('cors')

const UserController = require('./src/user/user.controller')
const ExerciceController = require('./src/exercice/exercice.controller')

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI, { dbName: 'test', useNewUrlParser: true })
  .then(() => {console.log('Database OK...')})
  .catch((err) => {
    console.log('Database KO...')
    console.error(err)
  })

app.use(cors())

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.post('/api/exercise/new-user', (req, res) => {
  let un = req.body.username
  let controller = new UserController()
  controller.saveUser(un)
    .then(u => {
      console.log(u)
      res.json(u)
    })
    .catch(err => {
      console.error(err)
    })
})

app.get('/api/exercise/users', (req, res) => {
  let controller = new UserController()
  controller.findAll()
    .then(users => {
      res.json(users)
    })
})

app.post('/api/exercise/add', (req, res) => {
  let controller = new ExerciceController()
  controller.saveExercice(req.body)
  res.json({ok: true})
})

app.get('/api/exercise/exerices', (req, res) => {
  let controller = new ExerciceController()
  controller.findAll()
    .then(exercices => {
      res.json(exercices)
    })
})


// Not found middleware
app.use((req, res, next) => {
  return next({status: 404, message: 'not found'})
})

// Error Handling middleware
app.use((err, req, res, next) => {
  let errCode, errMessage

  if (err.errors) {
    // mongoose validation error
    errCode = 400 // bad request
    const keys = Object.keys(err.errors)
    // report the first validation error
    errMessage = err.errors[keys[0]].message
  } else {
    // generic or custom error
    errCode = err.status || 500
    errMessage = err.message || 'Internal Server Error'
  }
  res.status(errCode).type('txt')
    .send(errMessage)
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})

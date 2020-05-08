const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre es necesario']
  },
  email: {
    type: String,
    required: [true, 'El email es necesario'],
    validate: {
      validator (value) {
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value)
      }
    },
    unique: [true, 'Este email ya está registrado']
  },
  password: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: [true, 'Selecciona tu país']
  },
  birthday: {
    type: Date,
    required: [true, 'Selecciona fecha de nacimiento']
  },
  photoUrl: {
    type: String,
    required: false,
    default: 'https://i.pinimg.com/474x/c3/53/7f/c3537f7ba5a6d09a4621a77046ca926d--soccer-quotes-lineman.jpg'
  },
  bio: {
    type: String,
    required: false,
    minlength: 50,
    maxlength: 160
  },
  languages: [{
    type: String,
    required: false
  }],
  createdAt: {
    type: Date,
    default: Date.now()
  },
  favEvents: [{
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: 'event'
  }],
  skills: [{
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: 'skill'
  }]
})

const userModel = mongoose.model('user', userSchema)
module.exports = userModel

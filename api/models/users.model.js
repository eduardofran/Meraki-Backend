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
    required: true,
    minlength: 6
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
    default: 'https://img1.freepng.es/20180328/vyq/kisspng-pile-of-poo-emoji-t-shirt-sticker-monkey-blushing-emoji-5abb88026f8a26.7155561615222394904569.jpg'
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
  skills: [{
    type: String,
    required: false
  }],
  favEvents: [{
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: 'events'
  }]
})

const userModel = mongoose.model('user', userSchema)
module.exports = userModel

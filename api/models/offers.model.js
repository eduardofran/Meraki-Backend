const mongoose = require('mongoose')

const offersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre es necesario']
  },
  icon: {
    type: String,
    required: [true, 'El icono es necesario']
  }
})

const offersModel = mongoose.model('offer', offersSchema)
module.exports = offersModel

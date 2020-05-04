const mongoose = require('mongoose')

const skillsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre es necesario']
  },
  icon: {
    type: String,
    required: [true, 'El icono es necesario']
  }
})

const skillsModel = mongoose.model('skill', skillsSchema)
module.exports = skillsModel

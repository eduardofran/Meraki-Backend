const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'El titulo es necesario']
  },
  description: {
    type: String,
    required: [true, 'La descripcion es necesario'],
    maxlength: 1000
  },
  country: {
    type: String,
    required: [true, 'Selecciona tu país']
  },
  countryDiacritics: {
    type: String
  },
  city: {
    type: String,
    required: [true, 'Añade tu localidad']
  },
  cityDiacritics: {
    type: String
  },
  street: {
    type: String,
    required: [true, 'Añade tu calle']
  },
  strNum: {
    type: String,
    required: [true, 'Añade el numero de tu calle']
  },
  skillsRequired: [{
    type: String,
    required: false
  }],
  offers: [{
    type: String,
    required: [true, 'Tienes que seleccionar alguna opcion']
  }],
  workHours: {
    type: Number,
    required: [true, 'Selecciona una opción']
  },
  available: [{
    type: String,
    required: [true, 'Selecciona tu disponibilidad']
  }],
  minStay: {
    type: String,
    required: [true, 'Selecciona una minima estancia']
  },
  mainPhoto: {
    type: String,
    required: false,
    default: 'https://images.unsplash.com/photo-1481555716071-8830d3e254ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
  },
  gallery: [{
    type: String,
    required: false
  }],
  createdAt: {
    type: Date,
    required: false,
    default: Date.now()
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'users'
  },
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: 'reviews'
  }]
})

const eventModel = mongoose.model('event', eventSchema)
module.exports = eventModel

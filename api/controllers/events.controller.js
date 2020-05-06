const removeDiacritics = require('diacritics').remove

const EventsModel = require('../models/events.model.js')
const { handleError } = require('../utils')

module.exports = {
  getAllEvents,
  getEvent
}

function queryPlace (place) {
  return {
    $or: [
      { country: { $regex: `${place}`, $options: 'i' } },
      { city: { $regex: `${place}`, $options: 'i' } },
      { countryDiacritics: { $regex: `${removeDiacritics(place)}`, $options: 'i' } },
      { cityDiacritics: { $regex: `${removeDiacritics(place)}`, $options: 'i' } }
    ]
  }
}
function getAllEvents (req, res) {
  const filters = []
  if (req.query.p) { filters.push(queryPlace(req.query.p)) }
  if (req.query.s) { filters.push({ skillsRequired: { $all: req.query.s.split(',') } }) }

  const query = (filters.length ? { $and: filters } : {})
  EventsModel
    .find(query)
    .populate('creator skillsRequired offers')
    .then(response => res.json(response))
    .catch((err) => handleError(err, res))
}

function getEvent (req, res) {
  EventsModel
    .findById(req.params.id)
    .populate('creator skillsRequired offers')
    .then(response => res.json(response))
    .catch((err) => handleError(err, res))
}

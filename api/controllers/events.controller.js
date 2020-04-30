const EventsModel = require('../models/events.model.js')
const { handleError } = require('../utils')

module.exports = {
  getAllEvents
}

function getAllEvents (req, res) {
  const filters = {}
  if (req.query.country) {
    filters.country = { $regex: `${req.query.country}`, $options: 'i' }
  }
  if (req.query.city) {
    filters.city = { $regex: `${req.query.city}`, $options: 'i' }
  }
  EventsModel
    .find(filters)
    .then(response => res.json(response))
    .catch((err) => handleError(err, res))
}

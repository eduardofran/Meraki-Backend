const EventsModel = require('../models/events.model.js')
const { handleError } = require('../utils')

module.exports = {
  getAllEvents
}

function getAllEvents (req, res) {
  let filters = {}
  if (req.query.place) {
    filters =
    {
      $or: [
        {
          country: {
            $regex: `${req.query.place}`, $options: 'i'
          }
        },
        {
          city: {
            $regex: `${req.query.place}`, $options: 'i'
          }
        },
        {
          countryWithoutDiacritics: {
            $regex: `${req.query.place}`, $options: 'i'
          }
        },
        {
          cityWithoutDiacritics: {
            $regex: `${req.query.place}`, $options: 'i'
          }
        }

      ]
    }
  }
console.log(filters)
  // if (req.query.country) {
  //   filters.country = { $regex: `${req.query.country}`, $options: 'i' }
  // }
  // if (req.query.city) {
  //   filters.city = { $regex: `${req.query.city}`, $options: 'i' }
  // }
  EventsModel
    .find(filters)
    .then(response => res.json(response))
    .catch((err) => handleError(err, res))
}

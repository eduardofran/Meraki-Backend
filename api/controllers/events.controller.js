const removeDiacritics = require('diacritics').remove

const EventsModel = require('../models/events.model.js')
const { handleError } = require('../utils')

module.exports = {
  getAllEvents,
  getEvent
}

function getAllEvents (req, res) {
  let filters = {
  }
  // ------- FILTRO PARA LUGARES -------------->
  if (req.query.p) {
    const place =
    {
      $or: [
        {
          country: {
            $regex: `${req.query.p}`, $options: 'i'
          }
        },
        {
          city: {
            $regex: `${req.query.p}`, $options: 'i'
          }
        },
        {
          countryDiacritics: {
            $regex: `${removeDiacritics(req.query.p)}`, $options: 'i'
          }
        },
        {
          cityDiacritics: {
            $regex: `${removeDiacritics(req.query.p)}`, $options: 'i'
          }
        }
      ]
    }

    if (filters.$and) {
      filters.$and.push(place)
    } else {
      filters = {
        $and: [
          place
        ]
      }
    }
  }
  // ------- FILTRO PARA HABILIDADES -------------->
  if (req.query.s) {
    let skills = ''
    if (req.query.s instanceof Array) {
      skills = {
        $or: req.query.s.map(element => {
          return JSON.parse(`{ "skillsRequired.title": "${element}" }`)
        })
      }
      console.log(skills)
    } else {
      skills = {
        $or: [
          JSON.parse(`{ "skillsRequired.title": "${req.query.s}" }`)
        ]
      }
      console.log(skills)
    }
    if (filters.$and) {
      filters.$and.push(skills)
    } else {
      filters = {
        $and: [
          skills
        ]
      }
    }
  }
  // ------- FILTRO PARA OFFERS -------------->
  if (req.query.o) {
    let offers = ''
    if (req.query.o instanceof Array) {
      offers = {
        $or: req.query.o.map(element => {
          return JSON.parse(`{ "offers.title": "${element}" }`)
        })
      }
      console.log(offers)
    } else {
      offers = {
        $or: [
          JSON.parse(`{ "offers.title": "${req.query.o}" }`)
        ]
      }
    }
    if (filters.$and) {
      filters.$and.push(offers)
    } else {
      filters = {
        $and: [
          offers
        ]
      }
    }
  }
  // ------- FILTRO PARA DISPO -------------->
  if (req.query.d) {
    let dispo = ''
    if (req.query.d instanceof Array) {
      dispo = {
        $or: req.query.d.map(element => {
          return JSON.parse(`{ "available": "${element}" }`)
        })
      }
      console.log(dispo)
    } else {
      dispo = {
        $or: [
          JSON.parse(`{ "available": "${req.query.d}" }`)
        ]
      }
    }
    if (filters.$and) {
      filters.$and.push(dispo)
    } else {
      filters = {
        $and: [
          dispo
        ]
      }
    }
  }

  console.log(filters)
  EventsModel
    .find(filters)
    .populate('creator skillsRequired')
    .then(response => res.json(response))
    .catch((err) => handleError(err, res))
}

function getEvent (req, res) {
  EventsModel
    .findById(req.params.id)
    .then(response => res.json(response))
    .catch((err) => handleError(err, res))
}

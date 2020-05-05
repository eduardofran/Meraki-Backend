const userModel = require('../models/users.model')
const { handleError } = require('../utils')

module.exports = {
  addFavorites,
  getFavorites,
  deleteFavorite
}

function getFavorites (req, res) {
  console.log('hi')
  userModel
    .findById(res.locals.user._id
    )
    .populate('favEvents')
    .then(user => {
      res.json(user.favEvents)
    })
    .catch((err) => handleError(err, res))
}
function addFavorites (req, res) {
  userModel
    .findOne({ _id: res.locals.user._id })
  console.log('hi')
    .then(user => {
      user.favEvents.push(req.body.favorite)
      return res.json(user)
    })
    .catch((err) => handleError(err, res))
}

function deleteFavorite (req, res) {
  userModel
    .remove({
      user: res.locals.user._id,
      favEvents: req.params.id
    })
    .then(lessons => res.json(lessons))
    .catch((err) => handleError(err, res))
}

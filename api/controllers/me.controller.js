const userModel = require('../models/users.model')
const { handleError } = require('../utils')

module.exports = {
  addFavorites,
  getFavorites,
  deleteFavorite
}

function getFavorites (req, res) {
  console.log('GET FAVORITES')
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
    .findById(res.locals.user._id)
    .then(user => {
      user.favEvents.push(req.body.favorite)
      user.save()
      return res.json(user)
    })
    .catch((err) => handleError(err, res))
}

function deleteFavorite (req, res) {
  userModel.findById(res.locals.user._id)
    .then(user => {
      console.log(user)
      user.favEvents.pull(req.params.id)
      user.save()
      return res.json(user.favEvents)
    })
    .catch((err) => handleError(err, res))
}
// userModel
//   .remove({
//     user: res.locals.user._id,
//     favEvents: req.params.id
//   })
//   .then(lessons => res.json(lessons))
//   .catch((err) => handleError(err, res))
// })

const userModel = require('../models/users.model')
const { handleError } = require('../utils')

module.exports = {
  addFavorites,
  getFavorites,
  deleteFavorite,
  getUser,
  updateSkills,
  deleteUser,
  updateUser
}

function getFavorites (req, res) {
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
function getUser (req, res) {
  userModel
    .findById(res.locals.user._id
    )
    .populate(' skills languages')
    .then(user => {
      res.json(user)
    })
    .catch((err) => handleError(err, res))
}
function updateSkills (req, res) {
  userModel
    .findByIdAndUpdate(res.locals.user._id
      , req.body, { new: true })
    .then(response => {
      return res.json(response)
    })
    .catch((err) => handleError(err, res))
}
function deleteUser (req, res) {
  userModel
    .findByIdAndDelete(res.locals.user._id
    )
    .then(user => {
      res.json(user)
    })
    .catch((err) => handleError(err, res))
}
function updateUser (req, res) {
  userModel
    .findByIdAndUpdate(res.locals.user._id
      , req.body, { new: true })
    .then(response => {
      return res.json(response)
    })
    .catch((err) => handleError(err, res))
}

const OffersModel = require('../models/offers.model.js')
const { handleError } = require('../utils')

module.exports = {
  getAllOffers
}

function getAllOffers (req, res) {
  OffersModel
    .find()
    .then(response => res.json(response))
    .catch((err) => handleError(err, res))
}

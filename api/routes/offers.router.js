const router = require('express').Router()

const {
  getAllOffers
} = require('../controllers/offers.controller')

router.get('/', getAllOffers)

module.exports = router

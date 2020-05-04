const router = require('express').Router()

const {
  getAllEvents,
  getEvent
} = require('../controllers/events.controller')

router.get('/', getAllEvents)
router.get('/:id', getEvent)

module.exports = router

const router = require('express').Router()
const eventsRouter = require('./events.router.js')
const skillsRouter = require('./skills.router.js')
const authRouter = require('./auth.router.js')

// const { authUser } = require('../utils') // Authenticated Route

router.use('/auth', authRouter)
router.use('/events', eventsRouter)
router.use('/skills', skillsRouter)

module.exports = router

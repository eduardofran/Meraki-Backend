const router = require('express').Router()
const eventsRouter = require('./events.router.js')
const skillsRouter = require('./skills.router.js')
const offersRouter = require('./offers.router.js')
const meRouter = require('./me.router.js')
const authRouter = require('./auth.router.js')

const { authUser } = require('../utils') // Authenticated Route

router.use('/auth', authRouter)
router.use('/events', eventsRouter)
router.use('/skills', skillsRouter)
router.use('/offers', offersRouter)
router.use('/me', authUser, meRouter)

module.exports = router

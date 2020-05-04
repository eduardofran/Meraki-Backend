const router = require('express').Router()

const {
  getAllSkills
} = require('../controllers/skills.controller')

router.get('/', getAllSkills)

module.exports = router

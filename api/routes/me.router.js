const router = require('express').Router()

const { addFavorites, getFavorites, deleteFavorite, getUser, updateSkills } = require('../controllers/me.controller')

router.get('/favorites', getFavorites)
router.post('/favorites', addFavorites)
router.delete('/favorites/:id', deleteFavorite)
router.get('/profile', getUser)
router.put('/profile/skills', updateSkills)

module.exports = router

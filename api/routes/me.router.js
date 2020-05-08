const router = require('express').Router()

const { addFavorites, getFavorites, deleteFavorite, getUser, updateSkills, deleteUser, updateUser } = require('../controllers/me.controller')

router.get('/favorites', getFavorites)
router.post('/favorites', addFavorites)
router.delete('/favorites/:id', deleteFavorite)
router.get('/profile', getUser)
router.delete('/profile', deleteUser)
router.put('/profile/skills', updateSkills)
router.put('/profile', updateUser)
module.exports = router

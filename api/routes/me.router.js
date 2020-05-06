const router = require('express').Router()

const { addFavorites, getFavorites, deleteFavorite, getUser } = require('../controllers/me.controller')

router.get('/favorites', getFavorites)
router.post('/favorites', addFavorites)
router.delete('/favorites/:id', deleteFavorite)
router.get('/profile', getUser)

module.exports = router

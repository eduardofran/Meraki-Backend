const router = require('express').Router()

const { addFavorites, getFavorites, deleteFavorite } = require('../controllers/me.controller')

router.get('/favorites', getFavorites)
router.post('/favorites', addFavorites)
router.delete('/favorites/:id', deleteFavorite)

module.exports = router

const express = require('express')
const router = express.Router()
const { read, readById, create, update, destroy } = require('../controllers/users')

router.get('/', read)
router.post('/', create)
router.get('/:id', readById)
router.put('/:id', update)
router.delete('/:id', destroy)

module.exports = router

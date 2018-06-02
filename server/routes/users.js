const express = require('express')
const router = express.Router()
const authorization = require('../middlewares/authorization')
const authentication = require('../middlewares/authentication')
const { auth, read, readById, create, update, destroy } = require('../controllers/users')

router.get('/', authentication, read)
router.post('/', create)
router.post('/auth', auth)
router.get('/:id', authentication, readById)
router.put('/:id', authentication, update)
router.delete('/:id', authentication, destroy)

module.exports = router

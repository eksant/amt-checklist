const express = require('express')
const router = express.Router()
const authorization = require('../middlewares/authorization')
const { read, readById, create, update, destroy } = require('../controllers/mobiltangkis')

router.get('/', authorization, read)
router.post('/', authorization, create)
router.get('/:id', authorization, readById)
router.put('/:id', authorization, update)
router.delete('/:id', authorization, destroy)

module.exports = router

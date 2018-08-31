const express = require('express')
const router = express.Router()
const amtController = require('../controllers/mobiltangkis')
const { validateToken } = require('../../middlewares/auth')

router.get('/', validateToken, amtController.read)
router.get('/:id', validateToken, amtController.readById)
router.post('/add', validateToken, amtController.create)
router.put('/update/:id', validateToken, amtController.update)
router.delete('/delete/:id', validateToken, amtController.destroy)

module.exports = router

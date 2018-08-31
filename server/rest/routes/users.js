const express = require('express')
const router = express.Router()
const userController = require('../controllers/users')
const { validateToken } = require('../../middlewares/auth')

router.get('/', validateToken, userController.read)
router.get('/:id', validateToken, userController.readById)
router.post('/add', validateToken, userController.create)
router.put('/update/:id', validateToken, userController.update)
router.delete('/delete/:id', validateToken, userController.destroy)

module.exports = router

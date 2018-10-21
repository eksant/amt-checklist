const express = require('express')
const router = express.Router()
const userController = require('../controllers/users')
const { validateTokenAdmin } = require('../../middlewares/auth')

router.get('/', validateTokenAdmin, userController.read)
router.get('/:id', validateTokenAdmin, userController.readById)
router.post('/add', validateTokenAdmin, userController.create)
router.put('/update/:id', validateTokenAdmin, userController.update)
router.delete('/delete/:id', validateTokenAdmin, userController.destroy)

module.exports = router

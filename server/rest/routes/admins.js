const express = require('express')
const router = express.Router()
const adminController = require('../controllers/admins')
const { validateTokenSuperadmin } = require('../../middlewares/auth')

router.get('/', validateTokenSuperadmin, adminController.read)
router.get('/:id', validateTokenSuperadmin, adminController.readById)
router.post('/add', validateTokenSuperadmin, adminController.create)
router.put('/update/:id', validateTokenSuperadmin, adminController.update)
router.delete('/delete/:id', validateTokenSuperadmin, adminController.destroy)

module.exports = router

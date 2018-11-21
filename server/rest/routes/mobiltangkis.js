const express = require('express')
const router = express.Router()
const amtController = require('../controllers/mobiltangkis')
const { validateTokenAdmin, validateTokenUser } = require('../../middlewares/auth')

router.get('/', validateTokenAdmin, amtController.read)
router.get('/:nopol', validateTokenUser, amtController.readByNopol)
router.get('/:id', validateTokenUser, amtController.readById)
router.post('/add', validateTokenAdmin, amtController.create)
router.put('/update/:id', validateTokenAdmin, amtController.update)
router.delete('/delete/:id', validateTokenAdmin, amtController.destroy)

module.exports = router

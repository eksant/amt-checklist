const express = require('express')
const router = express.Router()
const checklistController = require('../controllers/checklist')
const { validateTokenUser } = require('../../middlewares/auth')

router.get('/', validateTokenUser, checklistController.read)
router.get('/:id', validateTokenUser, checklistController.readById)
router.post('/add', validateTokenUser, checklistController.create)
router.put('/update/:id', validateTokenUser, checklistController.update)
router.delete('/delete/:id', validateTokenUser, checklistController.destroy)

module.exports = router

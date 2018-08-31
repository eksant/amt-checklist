const express = require('express')
const router = express.Router()
const checklistController = require('../controllers/checklist')
const { validateToken } = require('../../middlewares/auth')

router.get('/', validateToken, checklistController.read)
router.get('/:id', validateToken, checklistController.readById)
router.post('/add', validateToken, checklistController.create)
router.put('/update/:id', validateToken, checklistController.update)
router.delete('/delete/:id', validateToken, checklistController.destroy)

module.exports = router

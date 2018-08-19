// const express = require('express')
// const router = express.Router()
// const authorization = require('../middlewares/authorization')
// const { read, readById, create, update, destroy } = require('../controllers/mobiltangkis')

// router.get('/', authorization, read)
// router.post('/', authorization, create)
// router.get('/:id', authorization, readById)
// router.put('/:id', authorization, update)
// router.delete('/:id', authorization, destroy)

// module.exports = router

const mobiltangkiController = require('../controllers/mobiltangkis')
const authentication = require('../middlewares/authentication')

module.exports = (router) => {  
  router
  .route('/mt')
  .post(authentication, mobiltangkiController.create)

  router
  .route('/mt')
  .get(authentication, mobiltangkiController.read)

  router
  .route('mt/:id')
  .get(authentication, mobiltangkiController.readById)

  router
  .route('mt/:id')
  .put(authentication, mobiltangkiController.update)

  router
  .route('mt/:id')
  .delete(authentication, mobiltangkiController.destroy)
}
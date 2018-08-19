// const express = require('express')
// const router = express.Router()
// const authentication = require('../middlewares/authentication')
// const { auth, read, readById, create, update, destroy } = require('../controllers/users')

// router.get('/', read)
// router.post('/', create)
// router.post('/auth', auth)
// router.get('/:id', authentication, readById)
// router.put('/:id', authentication, update)
// router.delete('/:id', authentication, destroy)

// module.exports = router

const userController = require('../controllers/users')
const authentication = require('../middlewares/authentication')

module.exports = (router) => {
  router
  .route('/users/auth')
  .post(userController.auth)
  
  router
  .route('/users')
  .post(authentication, userController.create)

  router
  .route('/users')
  .get(authentication, userController.read)

  router
  .route('users/:id')
  .get(authentication, userController.readById)

  router
  .route('users/:id')
  .put(authentication, userController.update)

  router
  .route('users/:id')
  .delete(authentication, userController.destroy)
}

const bcrypt = require('bcryptjs')
const redis = require('redis')
const client = redis.createClient()

const {
  createAdmin,
  readAdmin,
  readAdminId,
  update,
  destroy,
  signIn,
} = require('../../models/users')
const auth = require('../../middlewares/auth')

module.exports = {
  signIn: (req, res) => {
    signIn(req.body.username, req.body.password, (error, user) => {
      if (!error) {
        const token = auth.createToken(user)

        req.headers.token = token
        res.status(200).json({
          message: 'User signed in successfully',
          user,
          token,
        })
      } else {
        res.status(203).json({
          message: 'Bad request',
          error,
        })
      }
    })
  },

  create: async (req, res) => {
    try {
      const data = await createAdmin({
        username: req.body.username,
        NIP: req.body.NIP || null,
        fullName: req.body.fullName || null,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
        mobile: req.body.mobile || null,
        roles: req.body.roles,
        status: 'Active',
        imgUrl: req.body.imgUrl || null,
        createdBy: req.authUser,
      })
      client.del('userCache')
      res.status(200).json({
        status: 200,
        message: 'Success to create record!',
        data,
      })
    } catch (error) {
      res.status(400).json({
        message: 'Bad request',
        error,
      })
    }
  },

  read: async (req, res) => {
    try {
      const data = await readAdmin()
      client.set('userCache', JSON.stringify(data), 'EX', 500)
      res.status(200).json({
        status: 200,
        message: 'Success to read records!',
        data,
      })
    } catch (error) {
      res.status(400).json({
        message: 'Bad request',
        error,
      })
    }
  },

  readById: async (req, res) => {
    try {
      const data = await readAdminId(req.params.id)
      client.set('userCache', JSON.stringify(data), 'EX', 500)
      res.status(200).json({
        status: 200,
        message: 'Success to read record!',
        data,
      })
    } catch (error) {
      res.status(400).json({
        message: 'Bad request',
        error,
      })
    }
  },

  update: async (req, res) => {
    try {
      const user = await readAdminId(req.params.id)
      if (user) {
        var item = {
          username: req.body.username,
          NIP: req.body.NIP || user.NIP,
          fullName: req.body.fullName || user.fullName,
          // email: req.body.email.trim(),
          mobile: req.body.mobile || null,
          roles: req.body.roles || user.roles,
          status: req.body.status || user.status,
          // createdBy: req.authUser[0],
        }

        if (req.body.password) {
          item = {
            ...item,
            password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
          }
        }

        const data = await update(req.params.id, item)
        client.del('userCache')
        res.status(200).json({
          status: 200,
          message: 'Success to update record!',
          data,
        })
      } else {
        res.status(200).json({
          message: 'Data not found!',
        })
      }
    } catch (error) {
      res.status(400).json({
        message: 'Bad request',
        error,
      })
    }
  },

  destroy: async (req, res) => {
    try {
      const data = await destroy(req.params.id)
      client.del('userCache')
      res.status(200).json({
        status: 200,
        message: 'Success to delete record!',
        data,
      })
    } catch (error) {
      res.status(400).json({
        message: 'Bad request',
        error,
      })
    }
  },
}

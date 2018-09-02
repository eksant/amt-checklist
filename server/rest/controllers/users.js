const bcrypt = require('bcryptjs')
const redis = require('redis')
const client = redis.createClient()

const { create, read, readId, update, destroy, signIn } = require('../../models/users')
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
        res.status(400).json({
          message: 'Bad request',
          error,
        })
      }
    })
  },

  create: (req, res) => {
    create(
      {
        username: req.body.username,
        NIP: req.body.NIP || null,
        fullName: req.body.fullName || null,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
        mobile: req.body.mobile || null,
        roles: req.body.roles,
        status: 'Active',
        imgUrl: req.body.imgUrl || null,
        createdBy: req.authUser[0],
      },
      (error, data) => {
        if (!error) {
          client.del('userCache')
          res.status(200).json({
            message: 'Success to insert record',
            data,
          })
        } else {
          res.status(400).json({
            message: 'Bad request',
            error,
          })
        }
      }
    )
  },

  read: (req, res) => {
    read((error, data) => {
      if (!error) {
        client.set('userCache', JSON.stringify(data), 'EX', 500)
        res.status(200).json({
          data,
        })
      } else {
        res.status(400).json({
          message: 'Bad request',
          error,
        })
      }
    })
  },

  readById: (req, res) => {
    readId(req.params.id, (error, data) => {
      if (!error) {
        client.set('userCache', JSON.stringify(data), 'EX', 500)
        res.status(200).json({
          data,
        })
      } else {
        res.status(400).json({
          message: 'Bad request',
          error,
        })
      }
    })
  },

  update: (req, res) => {
    readId(req.params.id, (error, user) => {
      if (user) {
        update(
          req.params.id,
          {
            username: req.body.username,
            NIP: req.body.NIP || user[0].NIP,
            fullName: req.body.fullName || user[0].fullName,
            // email: req.body.email.trim(),
            password:
              bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)) || user[0].password,
            mobile: req.body.mobile,
            roles: req.body.roles || user[0].roles,
            status: req.body.status || user[0].status,
            // createdBy: req.authUser[0],
          },
          (error, data) => {
            if (!error) {
              client.del('userCache')
              res.status(200).json({
                message: 'Success to update record!',
                data,
              })
            } else {
              res.status(400).json({
                message: 'Bad request',
                error,
              })
            }
          }
        )
      } else {
        res.status(400).json({
          message: 'Data not found!',
          error,
        })
      }
    })
  },

  destroy: (req, res) => {
    destroy(req.params.id, error => {
      if (!error) {
        client.del('userCache')
        res.status(200).json({
          message: 'Success to delete record!',
        })
      } else {
        res.status(400).json({
          message: 'Bad request',
          error,
        })
      }
    })
  },
}

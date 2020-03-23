require('dotenv').config()
const mongoose = require('mongoose')
const chalk = require('chalk')
const bcrypt = require('bcryptjs')
const saslprep = require('saslprep')

const { readSuperadmin, createSuperadmin } = require('../models/users')

module.exports = {
  connectToServer: () => {
    mongoose.Promise = global.Promise
    mongoose.connect(
      process.env.MONGODB_URI,
      {
        autoIndex: false,
        user: process.env.MONGODB_USER,
        pass: saslprep(process.env.MONGODB_PASSWORD),
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      },
      async error => {
        if (error) {
          console.error(
            '%s MongoDB connection error. Please make sure MongoDB is running\n%s',
            chalk.red('✗'),
            error.message
          )
        } else {
          console.log('%s MongoDB connection success', chalk.green('🚀'))

          // find and create account superadmin
          const superadmin = await readSuperadmin()
          if (superadmin.length < 1) {
            const data = await createSuperadmin({
              username: 'superadmin',
              NIP: 'PN-0000',
              fullName: 'Superadmin',
              email: 'superadmin@email.com',
              password: bcrypt.hashSync('P@ssw0rd', bcrypt.genSaltSync(10)),
              mobile: '6282122559090',
              status: 'Active',
              imgUrl: null,
              createdBy: 123456789,
            })

            if (data) {
              console.log('%s Superadmin has been created', chalk.green('🚀'))
            }
          } else {
            console.log('%s Superadmin already created', chalk.green('🚀'))
          }
        }
      }
    )
  },
}

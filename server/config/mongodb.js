const mongoose = require('mongoose')
const chalk = require('chalk')
const bcrypt = require('bcryptjs')

const { readSuperadmin, createSuperadmin } = require('../models/users')

const checkSuperadmin = async () => {
  const superadmin = await readSuperadmin()
  if (superadmin.length === 0) {
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

module.exports = {
  connectToServer: callback => {
    mongoose.Promise = global.Promise
    mongoose.connect(
      process.env.MONGODB_URI,
      {
        autoIndex: false,
        useNewUrlParser: true,
      }
    )
    mongoose.connection
      .once('open', () => {
        console.log('%s MongoDB connection success', chalk.green('🚀'))

        // find and create account superadmin
        checkSuperadmin()
      })
      .on(
        'error',
        error => {
          console.error(
            '%s MongoDB connection error. Please make sure MongoDB is running\n%s',
            chalk.red('✗'),
            error
          )
        }

        // console.error.bind(
        //   console,
        //   '%s MongoDB connection error. Please make sure MongoDB is running.',
        //   chalk.red('✗')
        // )
      )
    return callback()
  },
}

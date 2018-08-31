const mongoose = require('mongoose')
const chalk = require('chalk')

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
      })
      .on('error', error => {
        console.error('%s MongoDB connection error. Please make sure MongoDB is running\n%s', chalk.red('✗'), error)
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

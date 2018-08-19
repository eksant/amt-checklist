const users         = require('./users')
const mobiltangkis  = require('./mobiltangkis')

module.exports = (router) => {
    users(router)
    mobiltangkis(router)
}
const redis = require('redis')
const client = redis.createClient()

module.exports = (req, res, next) => {
  client.get('amt_cache', (err, reply) => {
    if (err) {
      res.send(500, err)
    } else if (!reply) {
      next()
    } else {
      res.send(JSON.parse(reply))
    }
  })
}

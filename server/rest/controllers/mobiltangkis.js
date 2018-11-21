const redis = require('redis')
const client = redis.createClient()

const { create, read, readId, readNoPol, update, destroy } = require('../../models/mobiltangkis')

module.exports = {
  create: async (req, res) => {
    try {
      const data = await create({
        nopol: req.body.nopol,
        KL: req.body.KL,
        year: req.body.year || null,
        status: 'Active',
        createdBy: req.authUser,
      })

      client.del('mobiltangkiCache')
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
      const data = await read()

      client.set('mobiltangkiCache', JSON.stringify(data), 'EX', 500)
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
      const data = await readId(req.params.id)

      client.set('mobiltangkiCache', JSON.stringify(data), 'EX', 500)
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

  readByNopol: async (req, res) => {
    try {
      const data = await readNoPol(req.params.nopol)

      client.set('mobiltangkiCache', JSON.stringify(data), 'EX', 500)
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
      const mobiltangki = await readId(req.params.id)

      if (mobiltangki) {
        const data = await update(req.params.id, {
          nopol: req.body.nopol || mobiltangki[0].nopol,
          KL: req.body.KL || mobiltangki[0].KL,
          year: req.body.year || mobiltangki[0].year,
          status: req.body.status || mobiltangki[0].status,
          createdBy: req.authUser[0],
        })
        client.del('mobiltangkiCache')
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

      client.del('mobiltangkiCache')
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

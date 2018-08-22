const {
  create,
  read,
  readId,
  update,
  destroy
} = require("../models/mobiltangkis");

module.exports = {
  create: (req, res) => {
    create(
      {
        nopol: req.body.nopol,
        KL: req.body.KL,
        year: req.body.year || null,
        status: 1,
      },
      (error, data) => {
        if (!error) {
          res.status(200).json({
            message: "Success to insert record",
            data
          });
        } else {
          res.status(400).json({
            message: "Bad request",
            error
          });
        }
      }
    );
  },

  read: (req, res) => {
    read((error, data) => {
      if (!error) {
        res.status(200).json({
          data
        });
      } else {
        res.status(400).json({
          message: "Bad request",
          error
        });
      }
    });
  },

  readById: (req, res) => {
    readId(req.params.id, (error, data) => {
      if (!error) {
        res.status(200).json({
          data
        });
      } else {
        res.status(400).json({
          message: "Bad request",
          error
        });
      }
    });
  },

  update: (req, res) => {
    readId(req.params.id, (error, mobiltangki) => {
      if (mobiltangki) {
        update(
          req.params.id,
          {
            nopol: req.body.nopol || mobiltangki[0].nopol,
            KL: req.body.KL || mobiltangki[0].KL,
            year: req.body.year || mobiltangki[0].year,
            status: req.body.status || mobiltangki[0].status,
          },
          (error, data) => {
            if (!error) {
              res.status(200).json({
                message: "Success to update record!",
                data
              });
            } else {
              res.status(400).json({
                message: "Bad request",
                error
              });
            }
          }
        );
      } else {
        res.status(400).json({
          message: "Data not found!",
          error
        });
      }
    });
  },

  destroy: (req, res) => {
    destroy(req.params.id, error => {
      if (!error) {
        res.status(200).json({
          message: "Success to delete record!"
        });
      } else {
        res.status(400).json({
          message: "Bad request",
          error
        });
      }
    });
  }
};

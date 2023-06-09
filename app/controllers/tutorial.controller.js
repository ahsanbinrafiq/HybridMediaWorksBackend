const db = require('../models');
const SheetData = db.sheetData;

// Create and Save a new SheetData
exports.create = (req, res) => {
  // Validate request
  // if (!req.body.title) {
  //   res.status(400).send({ message: 'Content can not be empty!' });
  //   return;
  // }

  // Create a SheetData
  const sheetData = new SheetData({
    sheet: req.body.sheet,
  });

  // Save SheetData in the database
  sheetData
    .save(sheetData)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the SheetData.',
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  // const title = req.query.title;
  // var condition = title
  //   ? { title: { $regex: new RegExp(title), $options: 'i' } }
  //   : {};

  SheetData.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving tutorials.',
      });
    });
};

// Find a single SheetData with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  SheetData.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: 'Not found SheetData with id ' + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: 'Error retrieving SheetData with id=' + id });
    });
};

// Update a SheetData by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Data to update can not be empty!',
    });
  }

  const id = req.params.id;

  SheetData.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update SheetData with id=${id}. Maybe SheetData was not found!`,
        });
      } else res.send({ message: 'SheetData was updated successfully.' });
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating SheetData with id=' + id,
      });
    });
};

// Delete a SheetData with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  SheetData.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete SheetData with id=${id}. Maybe SheetData was not found!`,
        });
      } else {
        res.send({
          message: 'SheetData was deleted successfully!',
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete SheetData with id=' + id,
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  SheetData.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} SheetData were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all sheetData.',
      });
    });
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  SheetData.find({ published: true })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving sheetData.',
      });
    });
};

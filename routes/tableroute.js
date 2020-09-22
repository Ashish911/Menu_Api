const express = require('express');
const Table = require('../models/table');
const router = express.Router();

//post table
router.post('/', (req, res) => {
  let newTable = new Table({
    TableName: req.body.TableName,
    TableCode: req.body.TableCode
  });
  newTable.save().then((TableDoc) => {
    res.send(TableDoc);
  });
});

//get table
router.get('/', (req, res) => {
  Table.find({})
    .then((tablelist) => {
      res.send(tablelist);
    })
    .catch((err) => {
      res.send('Error', err.message);
    });
});

module.exports = router;
const mongoose = require('mongoose');
const TableSchema = new mongoose.Schema({
  TableName: {
    type: String,
    required:true
  }
});

const Table = mongoose.model('table', TableSchema);
module.exports = Table;

const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  name: String,
  location: String,
  description: String,
  imageUrl: String,
});

module.exports = mongoose.model('Photo', photoSchema);

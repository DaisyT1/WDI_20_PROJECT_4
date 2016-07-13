var mongoose = require('mongoose');

var LocationSchema = mongoose.Schema({
  name: String,
  address: String,
  song: [{type: mongoose.Schema.ObjectId, ref: "Track"}]
  
});

module.exports = mongoose.model('Location', LocationSchema);
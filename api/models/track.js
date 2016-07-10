var mongoose = require('mongoose');

var TrackSchema = mongoose.Schema({
  title: String,
  spotID: Number,
  comment: String
  
});

module.exports = mongoose.model('Track', TrackSchema);
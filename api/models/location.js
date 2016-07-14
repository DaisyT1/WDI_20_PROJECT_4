var mongoose = require('mongoose');

var TrackSchema = mongoose.Schema({
  title: String,
  spotID: String,
  comment: String
},{ _id : false });

var LocationSchema = mongoose.Schema({
  name: String,
  location: {
    lat: Number,
    lng: Number
  },
  song: TrackSchema
});

module.exports = mongoose.model('Location', LocationSchema);
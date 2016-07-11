var mongoose = require('mongoose');
var Location = require('../models/location');

var UserSchema = mongoose.Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  current_dest: { lat: Number, lng: Number },
  locations: [{type: mongoose.Schema.ObjectId, ref: "Location"}]
  
});

module.exports = mongoose.model('User', UserSchema);
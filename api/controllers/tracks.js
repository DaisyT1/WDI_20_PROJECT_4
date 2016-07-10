var Track = require('../models/track');

function tracksCreate(req, res) {
 var track = new Track(req.body);
   track.save(function(err,track){
     if (err) return res.status(500).json({ error: 'Error'});
       res.json(track)
  });
}

function tracksIndex(req, res) {
  Track.find(function(err, tracks) {
    if(err) return res.status(500).json({ message: err });
    return res.status(200).json({ tracks: tracks });
  });
}

function tracksShow(req, res) {
  Track.findById(req.params.id, function(err, track) {
    if(err) return res.status(500).json({ message: err });
    return res.status(200).json({ track: track });
  });
}

function tracksUpdate(req, res) {
  Track.findOneAndUpdate({_id: req.params.id} , req.body, {new: true} , function(err, track){
    if (err) return res.status(500).json({ error: 'Error'});
      res.json(track)
  });
}

function tracksDelete(req, res) {
  Track.findByIdAndRemove(req.params.id, function(err) {
    if(err) return res.status(500).json({ message: err });
    return res.status(204).send();
  });
}

module.exports = {
  create: tracksCreate,
  index: tracksIndex,
  show: tracksShow,
  update: tracksUpdate,
  delete: tracksDelete
};
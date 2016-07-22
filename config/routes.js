var router = require('express').Router();
var usersController = require('../controllers/users');
var locationsController = require('../controllers/locations');
var tracksController = require('../controllers/tracks');

router.route('/users')
      .get(usersController.index)
      .post(usersController.new);

router.route('/users/:id')
 .get(usersController.show)
 .put(usersController.update)
 .delete(usersController.delete);

router.route('/locations')
      .get(locationsController.index)
      .post(locationsController.create);

router.route('/locations/:id')
  .get(locationsController.show)
  .put(locationsController.update)
  .delete(locationsController.delete);

router.route('/tracks')
      .get(tracksController.index)
      .post(tracksController.create);

router.route('/tracks/:id')
  .get(tracksController.show)
  .put(tracksController.update)
  .delete(tracksController.delete);

module.exports = router;
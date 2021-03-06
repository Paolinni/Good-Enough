var matchesController = require('./matchesController.js');
var helpers = require('../helpers/helpers.js');

module.exports = function(app) {
  app.get('/rematch', matchesController.reMatch);
  app.post('/photo', matchesController.savePhoto);
  
  app.post('/*', helpers.isLoggedIn);
  app.post('/match', matchesController.getMatch);
  app.post('/request', matchesController.sendConnect);
  app.post('/accept', matchesController.acceptConnect);
  app.post('/decline', matchesController.declineConnect);
};
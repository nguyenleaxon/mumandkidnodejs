var videoController = require('./controllers/video.js' );
var categoryController = require('./controllers/category.js');
var loginController = require('./controllers/login.js');

module.exports = function(app){
    videoController.registerRoutes(app);
    categoryController.registerRoutes(app);
    loginController.registerRoutes(app);


};
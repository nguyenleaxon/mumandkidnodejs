var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var bson = require('bson');
var app = express();
var unorm = require('unorm');
var constants = require('./constants.js')
//add route to app


// set up handlebars view engine
var handlebars = require('express3-handlebars' ).create({ defaultLayout: 'main' });
app.engine('handlebars', handlebars.engine);

//set application port
app.set('port',process.env.PORT || 3000);
// set handle bar layout
app.set('view engine','handlebars');

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(require('cors' )());

mongoose.connect('mongodb://localhost:27017/mumandkid', function (error) {
    if (error) {
        console.log(error);
    }
});


/*var options = {
    server: {
        socketOptions: { keepAlive: 1 }
    }
};
switch(app.get('env')){
    case 'development':
        mongoose.connect("mongodb://localhost:27017/video", options);
        break;
    case 'production':
        mongoose.connect(credentials.mongo.production.connectionString, options);
        break;
    default:
        throw new Error('Unknown execution environment: ' + app.get('env'));
}*/

//############### Catching 404 and 500 exception
// 404 catch-all handler (middleware)
app.use(function(err,req, res, next){
    console. error(err. stack);
    res. status(404);
    res. render('404' );
});


app.use(function(err, req, res, next){
    console. error(err. stack);
    res. status(500);
    res. render('500' );
});



// set application lister port
app.listen(app. get('port' ), function(){
    console. log( 'Express started on http://localhost:' +
    app. get('port' ) + '; press Ctrl-C to terminate.' );
});
//################# ROUTING ################
require('./routes.js' )(app)
var mongoose = require('mongoose')
    , Schema = mongoose.Schema

var Category = require('./category.js');

var videoSchema = mongoose.Schema({
    name: String,
    image: String,
    url: String,
    videocategory: { type: Schema.Types.ObjectId, ref: 'VideoCategory' }
});

/*videoSchema.methods.getOrders = function(){
    userModel.count({name: 'anand'}, function(err, c)
    //return Order.find({ customerId: this._id }, cb);
};*/

var Video = mongoose.model('video',videoSchema,"video");
module.exports = Video;



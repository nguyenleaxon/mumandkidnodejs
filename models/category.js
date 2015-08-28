var mongoose = require('mongoose')
    , Schema = mongoose.Schema


var categorySchema = mongoose.Schema({
    name : String,
    description : String,
    video :  { type: Schema.Types.ObjectId, ref: 'Video' },
    imagePath: String
});


var Category = mongoose.model('category',categorySchema,"category");
module.exports = Category;
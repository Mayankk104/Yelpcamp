var mongoose = require('mongoose');
var ObjectId = require('mongoose').ObjectID;


var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    discription: String,
    comment: [{
        type: mongoose.Schema.ObjectId,
        ref: "Comment"
    }]
});
module.exports = mongoose.model('Campground', campgroundSchema);

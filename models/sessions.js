var mongoose         = require('mongoose'),
    sessionSchema    = mongoose.Schema({session: String});
module.exports       = mongoose.model('Session',sessionSchema);

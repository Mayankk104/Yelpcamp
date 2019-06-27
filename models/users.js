const mongoose = require('mongoose'),
      validator= require('validator');

const userSchema = mongoose.Schema({
  username: {
    type:String,
    unique:true
  },

  email: {
    type      : String,
    trim      : true,
    minlength : 1,
    unique    : true,
    validate  : {
      validator : validator.isEmail,
      message   :  '{VALUE} is not a valid e-mail'
    }
  },
  password  : {
    type      : String,
    required  :true,
    minlength: 6
  }
});

module.exports = mongoose.model('User',userSchema);

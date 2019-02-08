var mongoose = require('mongoose'),
    validator= require('validator'),

    userSchema    = mongoose.Schema({
        username: String,

           email: {
                         type: String,
                     required: true,
                        trim : true,
                    minlength: 1,
                       unique: true,
                     validate:{
                                validator: validator.isEmail,
                                  message:  '{VALUE} is not a valid e-mail'
                                }
                    },

        password: {
                        type: String,
                    required:true,
                   minlength: 6
                    }
//          token:[{
//                   access:{
//                       type:String,
//                   required: true
//                   },
//                   token:{
//                       type: String,
//                   required: true
//                    }
//               }]
    });
module.exports       = mongoose.model('User',userSchema);

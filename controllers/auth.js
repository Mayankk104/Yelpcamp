const   User    = require('../models/users'),
        bcrypt  = require('bcryptjs'),
        loginErrorHandler = require('../util/loginerrorhandler');

exports.getLogin = (req,res)=>{
    res.render('auth/login',{
        title: "login",
        isLoggedIn: false,
        errorMessage: null
    });
}

exports.postLogin = (req,res)=>{
    User.findOne({email:req.body.email})
    .then(user=>{
        if(user){
            bcrypt.compare(req.body.password,user.password)
            .then(domatch =>{
                if(domatch){
                    req.session.isLoggedIn=true;
                    req.session.user= user;
                    res.redirect('/campgrounds')
                }else{
                    loginErrorHandler.errorHandler(req,res,"Password does't match")
                }
            })
            .catch(err =>{
                loginErrorHandler.errorHandler(req,res,"Something went wrong try again")
                
            })
        }else{
            loginErrorHandler.errorHandler(req,res,"User not found")
        }
    })
    .catch(err =>{
        console.log(err)
        loginErrorHandler.errorHandler(req,res,"Network Error Try Again")
    })
}
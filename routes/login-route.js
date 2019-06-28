const express = require('express'),
      bcrypt  = require('bcryptjs'),
      router  = express.Router(),
      authController = require('../controllers/auth')

var   User    = require('../models/users')


router.get('/login',authController.getLogin)
router.post('/login',authController.postLogin)


router.post('/logout',(req,res)=>{
    req.session.destroy(()=>{
        res.redirect('/');
    })
})

router.get('/sigup',(req,res)=>{
    res.render('auth/sigup',{title: 'Sigup', isLoggedIn: false})
})


router.post('/sigup',(req,res) =>{
    if(req.body.password===req.body.confirmpassword)
        {
            User.findOne({email:req.body.email},(err,user)=>{
                    if(user){
                        console.log(user)
                        res.redirect('/sigup')
                    }else {
                         var password= bcrypt.hashSync(req.body.password,1)
                         console.log(req.body.email,password)
                        User.create({email:req.body.email,password:password},(err,user)=>{
                        res.redirect('/login');
                        });
                    }

            })

        }
    else{
        res.redirect('/sigup');
    }
});

module.exports.loginRoute = router;

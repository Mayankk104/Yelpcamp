const express = require('express'),
      bcrypt  = require('bcryptjs')
      router  = express.Router();

var   User    = require('../models/users')


router.get('/login',function(req,res){

    //console.log(req.isLoggedIn)
    res.render('login',{title: "login",isLoggedIn: false});
})

router.post('/login',(req,res)=>{

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
                    res.redirect('/login')
                }
            }).catch(err =>{console.log(err)})
        }else{
            res.redirect('/login')
        }
    })
        .catch(err =>{console.log(err)})
})


router.post('/logout',(req,res)=>{
    req.session.destroy(()=>{
        res.redirect('/');
    })
})

router.get('/sigup',(req,res)=>{
    res.render('sigup',{title: 'Sigup', isLoggedIn: false})
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

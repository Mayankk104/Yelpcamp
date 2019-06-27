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
                    res.redirect('/login')
                }
            }).catch(err =>{console.log(err)})
        }else{
            res.redirect('/login')
        }
    })
    .catch(err =>{
        res.render('auth/login',{
            errorMessage: "NETWORK ERROR! try again",
            email: req.body.email,
            password: req.body.password
        })
    })
}
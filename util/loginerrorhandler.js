exports.errorHandler =  (req,res,message)=>{
    res.render('auth/login',{
        title:'Login',
        isLoggedIn:false,
        errorMessage: message,
        email: req.body.email,
        password: req.body.password
    })
}
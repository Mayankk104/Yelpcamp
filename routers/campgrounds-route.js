const express = require('express'),
      router  = express.Router(),

  Campground  = require('../models/campgrounds'),
     Comment  = require('../models/comments'),
      isAuth  = require('./isAuth')


router.post('/campgrounds',(req,res) => {
    Campground.create(req.body,(err,camp)=>{
        if(err)
            {
                console.log(err);
            }
        else{
            console.log(camp);
            res.redirect('/campgrounds');
        }
    })
})

router.get("/campgrounds",function(req,res){
 Campground.find({},function(err,camps){
     if(err){
        console.log('ERROR!');
    }else{
        res.render('camps',{campgrounds: camps, title: 'Campgrounds', isLoggedIn: req.session.isLoggedIn});
        }
    })
});


router.get("/campgrounds/new",isAuth,(req,res)=>{
    res.render('new',{title: 'New Camp',isLoggedIn: req.session.isLoggedIn,});
});

router.get('/campgrounds/:id', function (req, res) {
    Campground.findById(req.params.id).populate("comment").exec((err, campinfo)=>{
        if(err){
            console.log(err);
            res.send('<h1>404 Error! page not found</h1>')
        }else{
            console.log(req.session.user);
            if(req.session.user){
                res.render('campinfo',{
                camp: campinfo,
                title: campinfo.name,
                isLoggedIn: req.session.isLoggedIn,
                user:req.session.user.email
                })
            }else{
                res.render('campinfo',{
                camp: campinfo,
                title: campinfo.name,
                isLoggedIn:false
                })

            }

        }
    })
});

router.post('/campgrounds/:id',(req,res)=>{
Comment.create(req.body.comment,function(err,commentFormform){
    if(err){
        console.log(err);
    }else{
        Campground.findById(req.params.id,function(err,camp){
            if(err){
                console.log(err);
            }else{
                camp.comment.push(commentFormform);
                camp.save();
                res.redirect('/campgrounds/'+req.params.id);
                 }
            }
        )
    }}
)});


module.exports.campgroundsRoute = router;

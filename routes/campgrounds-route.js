const express       = require('express'),
      router        = express.Router(),
      moment        = require('moment'),
      nodeGeocoder  = require('node-geocoder')

      Campground    = require('../models/campgrounds'),
      Comment       = require('../models/comments'),
      isAuth        = require('./isAuth'),

      campgroundsControllers  = require('../controllers/camps')


router.post('/campgrounds',campgroundsControllers.createCamp)

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
    console.log(req.session)
    const now = new Date().getTime();
    res.render('new',{
        title: 'New Camp',
        isLoggedIn: req.session.isLoggedIn,
        creator: req.session.name,
        createdOn: now
    });
});

router.get('/campgrounds/:id', function (req, res) {
    Campground.findById(req.params.id).populate("comment").exec((err, campinfo)=>{
        if(err){
            console.log(err);
            res.send('<h1>404 Error! page not found</h1>')
        }else{
            console.log(campinfo)
            if(req.session.user){
                res.render('campinfo',{
                camp: campinfo,
                createdOn: moment(+campinfo.createdOn).fromNow(),
                title: campinfo.name,
                isLoggedIn: req.session.isLoggedIn,
                user:req.session.user.email
                })
            }else{
                res.render('campinfo',{
                camp: campinfo,
                title: campinfo.name,
                isLoggedIn:false,
                user:''
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
                camp.comment.push(commentFormform._id);
                camp.save();
                res.redirect('/campgrounds/'+req.params.id);
                 }
            }
        )
    }}
)});

router.delete('/campgrounds/:id',(req,res)=>{
    console.log(req.body)
    Comment.findByIdAndDelete(req.body.id)
    .then(comment=>{
        var strg = req.body.campid;
        console.log(strg)
    })
    .catch(
        res.redirect('/campgrounds/'+req.body.campid)
    )
})

module.exports.campgroundsRoute = router;

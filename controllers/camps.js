const Campground  = require('../models/campgrounds')


exports.createCamp = (req,res) => {
    // var gercoder = nodeGeocoder({provider: 'google',
    //     httpAdapter:'https',
    //     apiKey:process.env.GEOCODING_API_KEY,
    //     formatter:null
    // })
    
    // gercoder.geocode(req.body.location)
    // .then(data=>{
    var lat = 28.6841;
    var lng = 77.0633;
    var location = 'Nangloi,Delhi-110041';
    
    Campground.create({...req.body,createdOn: +req.body.createdOn,location:location,lat:lat,lng:lng})
    .then(camp=>{
        res.redirect('/campgrounds')
    })
    .catch(err=>{
        console.log(err);
        res.redirect('/campgrounds')
    })         
}
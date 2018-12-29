var express          = require("express"),
    app              = express(),
    ejs              = require("ejs"),
    bodyParser       = require('body-parser'),
    mongoose         = require('mongoose');


//var camps          = [{name:"Simla", image:"https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg"},
//                        {name:"Ladakh", image:"https://farm4.staticflickr.com/3140/5710228285_e12b762bff.jpg"},
//                        {name:"Punch", image:"https://farm5.staticflickr.com/4586/38628814451_838ae2b6d6.jpg"}];


mongoose.connect("mongodb://localhost/Yelpcamp;");
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended: true}));


var campgroundSchema = new mongoose.Schema({name: String, image: String}),
    Campground       = mongoose.model('Campground',campgroundSchema);


//Campground.create({name:"Punch", image:"https://farm5.staticflickr.com/4586/38628814451_838ae2b6d6.jpg"},function(er,campground)
//                  {
//                    if(er)
//                        {
//                            console.log('Error');
//                        }
//                    else
//                        {
//                            console.log(campground);
//                        }
//});



app.get("/",function(req, res){
    res.render('home');
});

app.get("/campgrounds", function(req, res){
    Campground.find({},function(err , camps){
        if(err)
            {
                console.log('ERROR!');
            }
        else
            {
                res.render('camps',{campgrounds: camps});
            }

})});

app.get("/campgrounds/new", function(req, res){
    res.render('new');
});

app.post('/campgrounds',function(req, res){
    var name = req.body.name;
    var image = req.body.image ;
    var newObject= {name:name , image: image};

    camps.push(newObject);
    res.redirect('/campgrounds')
});



app.listen(3000, function(){console.log("Server is running");});

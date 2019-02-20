const express     = require("express"),
      app         = express(),
      bodyParser  = require("body-parser"),
      mongoose    = require('mongoose'),
      session     = require('express-session'),
      MongodbStore= require('connect-mongodb-session')(session),

      campGrdRoute= require('./routers/campgrounds-route.js'),
      Session     = require('./models/sessions'),
      loginRoute  = require('./routers/login-route.js');



var store = new MongodbStore({
    uri: 'mongodb+srv://Mayankk104:MongoMayank@cluster0-itcku.mongodb.net/Yelpcamp'||'mongodb://heroku_ssk5f47f:86hdd57le7v38cn6lvlm0i71bo@ds123124.mlab.com:23124/heroku_ssk5f47f',
    collection: 'sessions'
})

mongoose.connect('mongodb+srv://Mayankk104:MongoMayank@cluster0-itcku.mongodb.net/Yelpcamp?retryWrites=true' ||'mongodb://heroku_ssk5f47f:86hdd57le7v38cn6lvlm0i71bo@ds123124.mlab.com:23124/heroku_ssk5f47f');
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+'/public'));
app.use(session({secret:"mera jota hai japani", resave: false, saveUninitialized: false,store: store}));

app.get("/",function(req,res){
res.render('home',{title: 'YelpCamp',isLoggedIn: req.session.isLoggedIn})
});

app.use(campGrdRoute.campgroundsRoute);
app.use(loginRoute.loginRoute);

app.listen(process.env.PORT||3000,()=>{console.log("Server is running");});

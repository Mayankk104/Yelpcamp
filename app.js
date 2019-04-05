const express     = require("express"),
      app         = express(),
      bodyParser  = require("body-parser"),
      mongoose    = require('mongoose'),
	  dotenv	  = require('dotenv').config(),
      session     = require('express-session'),
      MongodbStore= require('connect-mongodb-session')(session),

      campGrdRoute= require('./routers/campgrounds-route.js'),
      Session     = require('./models/sessions'),
      loginRoute  = require('./routers/login-route.js');

	console.log(process.env.MONGODB_URI)

var store = new MongodbStore({
    uri: process.env.MONGODB_URI,
    collection: 'sessions'
})

mongoose.connect(process.env.MONGODB_URI);
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

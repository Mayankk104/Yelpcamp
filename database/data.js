const mongodb     = require('mongodb'),
      mongoClient = mongodb.MongoClient;

const mongoConnect = callback =>{
mongoClient.connect('mongodb+srv://Mayankk104:MongoMayank@cluster0-itcku.mongodb.net/Yelpcamp?retryWrites=true',{useNewUrlParser:true })
    .then(client =>{
    console.log('Connected')
    callback(client);})
    .catch((err)=>{console.log(err)})};

module.exports = mongoConnect;


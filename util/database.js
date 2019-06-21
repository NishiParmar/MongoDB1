const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://nishi_parmar:nishi2707@cluster0-b0bos.mongodb.net/shop', { useNewUrlParser: true })
    .then(client => {
        console.log('Connected!');
        _db=client.db();
        callback();
    })
    .catch(err => console.log(err));

};
const getDB = () =>{
    if(_db){
        return _db;
    }
    throw 'No Connection'
    
}


exports.mongoConnect=mongoConnect;
exports.getDB=getDB;


const mongoose = require('mongoose');

const userModel = {
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    apikey:{
        type:String,
        required:true
    }
}
const USER = module.exports = mongoose.model('user',userModel);

module.exports.getAllData=function(callback){
    USER.find(callback);
}
module.exports.addUser=function(user,callback){
    USER.create(user,callback)
}
// module.exports.getUserbyId=function(userid,callback){
//     query={
//         apikey:userid
//     }
//     USER.findOne(query,callback)
// }
module.exports.getbyUsername = function (userName, callback) {
    query = {
        username: userName
    }
    USER.findOne(query, callback);
};

module.exports.removeUser=function(user,callback){
    query={
        apikey:user.apikey
    }
    User.findByIdAndRemove(query, callback);
}

module.exports
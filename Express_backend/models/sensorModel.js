const mongoose = require ('mongoose');

const SensorSchema={
    door: {
        type:String,
        required:true
   },
   password:{
        type:String,
        default:0
   },
   time:{
       type:String,
       default:Date.now()/1000
   },
//    userid:{
//         type:String,
//         required:true
//    },
   username:{
       type:String,
       required:true
   },
   secret:{
       type:String,
       required:true
   }
}
const SENSOR = module.exports = mongoose.model('Sensor',SensorSchema);


module.exports.addSensor=function(device,callback){
    SENSOR.create(device,callback);
};

module.exports.getAllData=function(callback){
    SENSOR.find(callback);
};
module.exports.updateData=function(user,callback){
    query={
        _id:user.id
    }
    query1={
        password:user.password,
        time:user.time
    }
    SENSOR.findByIdAndUpdate(query,query1,callback)
}
module.exports.getSensorbyUserId=function(user,callback){
    query={
        username:user.username,
        door:user.door
    }
    SENSOR.findOne(query,callback);
}
module.exports.getSensorbyUser=function(user,callback){
    query={
        username:user,
    }
    SENSOR.find(query,callback);
}

module.exports
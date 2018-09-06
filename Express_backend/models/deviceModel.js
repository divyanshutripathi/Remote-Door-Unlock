const mongoose = require ('mongoose');

const DeviceSchema={
    device: {
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    secret:{
        type:String,
        required:true
    }
}

const DEVICE = module.exports = mongoose.model('device',SensorSchema);

module.exports.addDevices=function(device,callback){
    DEVICE.create(device,callback);
};

module.exports.getAllDevices=function(callback){
    DEVICE.find(callback);
}

module.exports.getDevicebyUserId=function(obj,callback){
    query={
        username:obj.username,
        device:obj.device
    }
    DEVICE.findOne(query,callback)
}

module.exports.getDevicebyUser=function(username,callback){
    
}
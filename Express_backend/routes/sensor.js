var express = require('express');
var router = express.Router();
const SENSOR = require('../models/sensorModel');
const USER = require('../models/userModel');

const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://divyanshu.eraofiot.in');

client.on('connect', ()=>{
    console.log('mqtt broker connected');
  });

var aes256 = require('aes256');
var uid = require('uid');


var key="";

/* GET home page. */
router.get('/', function (req, res, next) {
    SENSOR.getAllData((err, devices) => {
        if (err) {
            res.json({
                success: false,
                msg: err
            });
        }
        else {
            res.json({
                success: true,
                msg: devices
            })
        }
    });
});

router.post('/changePass', (req, res) => {
    // console.log((req.body).toString()+"\n\n\n")
    // console.log(typeof(req.body)+"\n\n\n")
    // obj=JSON.parse(req.body.toString());

    // req=JSON.parse(req)
    // console.log(req.body)
    

    if (!req.body.door || !req.body.password || !req.body.newpassword || !req.body.username) {
        res.json({
            success: false,
            msg: 'Insufficient data!'
        });
    }


    else {
        USER.getbyUsername(req.body.username, (err, resUser) => {
            if (err) {
                res.json({
                    "success": false,
                    "msg": err
                })
            }
            else {
                if (!resUser) {
                    res.json({
                        "success": false,
                        "msg": "user does not exist"
                    })
                }
                else {
                    sensdata = {
                        username: resUser.username,
                        door: req.body.door
                    }
                    SENSOR.getSensorbyUserId(sensdata, (err, resSensor) => {
                        if (err) {
                            res.json({
                                "success": false,
                                "msg": err
                            })
                        }
                        else {
                            if (resSensor) {
                                if(req.body.password == resSensor.password)
                                {
                                var tim = Date.now()/1000
                                tosend = {
                                    password: req.body.newpassword,
                                    time: tim,
                                    username: req.body.username,
                                    id: resSensor._id

                                }
                                SENSOR.updateData(tosend, (err) => {
                                    if (err) {
                                        res.json({
                                            "success": false,
                                            "msg": err
                                        })
                                    }
                                    else {
                                        
                                        res.json({
                                            "success": true,
                                            "msg": "data updated"
                                        })
                                    }
                                })
                            }
                            else{
                                res.json({
                                    success:false,
                                    msg:"password does not match"
                                })
                            }
                        }
                            
                            else {
                                res.json({
                                    "success": false,
                                    "msg": "sensor not found, add the sensor"
                                })
                            }
                        
                    }
                    
                
                    })

                }

            }


        })
    }
});
router.post('/checkPass',(req,res)=>{
    if(!req.body.door || !req.body.username || !req.body.password)
    {
        res.json({
            success: false,
            msg: 'Insufficient data!'

        });
    }
    else{
        SENSOR.getSensorbyUserId(req.body,(err,resSensor)=>{
            if(err){
                res.json({
                    "success": false,
                    "msg": err
                })
            }
            else{
                if(!resSensor)
                {
                    res.json({
                        success:false,
                        msg:"user does not exist"
                    })
                }
                else{
                    console.log("ionic password "+req.body.password);
                    console.log("mongo password "+resSensor.password);
                    if(req.body.password == resSensor.password)
                    {
                        client.publish("unlock","1");
                        res.json({
                            success:true,
                            msg:"password successfully matched"
                        })
                    }
                    else{
                        res.json({success:false,
                        msg:"password did not matched"
                        })
                    }
                }
            }
        })
    }
})
router.post('/addDevice', (req, res) => {
    if (!req.body.door || !req.body.password || !req.body.username) {
        res.json({
            success: false,
            msg: 'Insufficient data!'

        });
    }
    else {
        USER.getbyUsername(req.body.username, (err, resUser) => {
            if (err) {
                res.json({
                    "success": false,
                    "msg": err
                })
            }
            else {
                if (!resUser) {
                    res.json({
                        "success": false,
                        "msg": "user does not exist"
                    })
                }
                else {
                    sensdata = {
                        username: req.body.username,
                        password:req.body.password,
                        door: req.body.door
                    }
                    SENSOR.getSensorbyUserId(sensdata, (err, resSensor) => {
                        if (err) {
                            res.json({
                                "success": false,
                                "msg": err
                            })
                        }
                        else {
                            if (resSensor) {
                                res.json({
                                    "success": false,
                                    "msg": "the sensor with same name already exist"
                                })
                            }
                            else {
                                var tim = Date.now()/1000
                                key=uid(11)
                                toSend = {
                                    door: req.body.door,
                                    password: req.body.password,
                                    time: tim,
                                    username: resUser.username,
                                    secret: key
                                }

                                SENSOR.addSensor(toSend, (err) => {
                                    if (err) {
                                        res.json({
                                            success: false,
                                            msg: err
                                        })
                                    }
                                    else {
                                        res.json({
                                            success: true,
                                            msg:  "new sensor added"// {
                                               // msg: "new sensor added",
                                                //key: uid(11)
                                            //}
                                        });

                                    }
                                })

                            }
                        }
                    })
                }
            }
        })
    }
});

router.post('/getusersensors', (req, res) => {
    if (!req.body.username ) {
        res.json({
            success: false,
            msg: "insufficient data"
        })
    }
    else {
        SENSOR.getSensorbyUser(req.body.username, (err, resSensor) => {
            if (err) {
                res.json({
                    success: false,
                    msg: err
                })
            }
            else {
                //console.log(resSensor)
                res.json({
                    success: true,
                    msg: resSensor
                })
            }
        })
    }
})


module.exports = router;

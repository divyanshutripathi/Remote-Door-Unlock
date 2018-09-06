var express = require('express');
var router = express.Router();
//const SENSOR = require('../models/sensorModel');
const DEVICE = require('.//models/deviceModel');
const USER = require('../models/userModel');

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


router.post('/addDevice', (req, res) => {
    if (!req.body.device || !req.body.username) {
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
                        device: req.body.device
                    }
                    DEVICE.getDevicebyUserId(sensdata, (err, resSensor) => {
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
                                key=uid(11)
                                toSend = {
                                    device: req.body.device,
                                    //distance: req.body.distance,
                                    // unit: req.body.unit,
                                    // time: req.body.time,
                                    username: resUser.username,
                                    secret: key
                                }

                                SENSOR.addDevices(toSend, (err) => {
                                    if (err) {
                                        res.json({
                                            success: false,
                                            msg: err
                                        })
                                    }
                                    else {
                                        res.json({
                                            success: true,
                                            msg: {
                                                msg: "new sensor added",
                                                key: uid(11)
                                            }
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

router.post('/getDevicesbyUser', (req, res) => {
    if (!req.body.username) {
        res.json({
            success: false,
            msg: "insufficient data"
        })
    }
    else {
        DEVICE.getDevicebyUser(req.body.username, (err, resSensor) => {
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



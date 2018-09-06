var express = require('express');
var router = express.Router();
const USER = require('../models/userModel');
var uid = require('uid');

/* GET users listing. */
router.get('/', function (req, res, next) {
  USER.getAllData((err, user) => {
    if (err) {
      res.json({
        success: false,
        msg: err
      });
    }
    else {
      res.json({
        success: true,
        msg: user
      })
    }
  });
});

router.post('/addUser', (req, res) => {

  //console.log(req.body)
  if (!req.body.name || !req.body.username || !req.body.password) {
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
        if (resUser) {
          res.json({
            "success": false,
            "msg": "user already exist"
          })
        }
        else {
          var userid = uid(15);
          tosend = {
            name: req.body.name,
            username: req.body.username,
            password: req.body.password,
            apikey: userid
          }
          USER.addUser(tosend, (err) => {
            if (err) {
              res.json({
                "success": false,
                "msg": err
              })
            }
            else {
              res.json({
                "success": true,
                "msg": {
                  msg: "user added successfully",
                  apikey: userid
                }
              })
            }
          })
        }
      }
    });
  }

});

router.post('/login', (req, res) => {
  console.log(JSON.stringify(req.body))
  if (!req.body.username || !req.body.password) {
    res.json({
      "success": false,
      "msg": "Insufficient Data"
    })
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
          if(resUser.password == req.body.password)
          {
            res.json({
              success:true,
              msg:'login successfull'
            })
          }
          else{
            res.json({
              success:false,
              msg:"password incorrect"
            })
          }
        }
      }
    })
  }
})

router.post('/deleteuser', (res, req) => {
  if (!req.body.username || !req.body.password) {
    res.json({
      "success": false,
      "msg": "Insufficient Data"
    })
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
          USER.removeUser(resUser, (err) => {
            if (err)
              res.json({
                "success": false,
                "msg": err
              })
            else {
              res.json({
                "success": true,
                "msg": "user removed successfully"
              })
            }
          })
        }
      }
    });
  }
});

module.exports = router;

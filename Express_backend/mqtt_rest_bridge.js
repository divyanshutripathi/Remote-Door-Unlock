const request = require('request');
const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://ashu.eraofiot.in');

client.on('connect', ()=>{
    console.log('mqtt broker connected');
    client.subscribe('data');
    console.log("subscribed to topic : data");
    
    //client.publish(topic,JSON.stringify(payload));
    //console.log(payload);
  });

  client.on('message',(topic,message)=>{
    //   console.log(message+"\n\n\n");
    //   console.log(typeof(message));
      
    // var payload = JSON.parse(message.toString());

    console.log(message.toString());

    var options = {
      uri: "http://18.188.167.6:3000/sensor",
      headers: {
        'Content-Type': "application/json"
    
    },
    body:JSON.stringify(JSON.parse(message))
    };

    request.post(options, (err, res, body) => {
        console.log("posted : "+body);
        var inbound = JSON.parse(body);
        if(err)
        console.log(err);
        if (inbound.sucess){
            console.log(inbound.msg);
          }
          else{
            console.log(inbound.msg);
          }});
    })
// })

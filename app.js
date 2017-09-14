const request = require('request');
const express = require('express');
const bodyParser = require('body-parser');
const indexObj = require('./index.js');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = app.listen(process.env.PORT || 3434, () => {
  console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});

// Auth



app.get('/testGet', function(req, res){
  console.log(req)
  if (!req.query.code) { // access denied
    res.redirect('http://www.girliemac.com/slack-httpstatuscats/');
    return;
  }
});   



app.get('/getDevices', function(req, res){
    indexObj.getDataFromIndex((devicesObject)=>{
        var responseDataObject = [];
        for (var i = 0; i < devicesObject.length; i++) {
            var row = devicesObject[i];
            console.log(row[0]);
            responseDataObject.push({"deviceName": row[0],"OSVersion": row[1],"OS": row[2],"allottedTo": row[3],"isAllotted":row[4]});
          }
        res.status(200)
        res.contentType('application/json');
        res.send(JSON.stringify(responseDataObject));
    });    
  });

  app.get('/getDevice/:userId', function(req, res){
      console.log("User id : ", req.params.userId);
    indexObj.getDeviceAuth(req.params.userId,(deviceObject)=>{
            var responseDataObject;
            console.log(deviceObject[0]);
            responseDataObject = {"deviceName": deviceObject[0],"OSVersion": deviceObject[1],"OS": deviceObject[2],"allottedTo": deviceObject[3],"isAllotted":deviceObject[4]};
         
        res.status(200)
        res.contentType('application/json');
        res.send(JSON.stringify(responseDataObject));
    });    
  });

app.post('/test', function(req, res){
if (req.body.message === "hi"){
  res.status(200).send({success:true,message:"Hi who are you"})

}  else {
  res.status(400).send()
}
});

app.post('/signup', function(req, res){
    indexObj.getUserNameAuth(req.body.id, (username)=>{        
        res.status(200).send({success:true, message : username});
    });   
    });

app.put('/updateDevice', function(req, res){
        indexObj.updateDataAuth(req.body.id,req.body.deviceName, ()=>{        
            res.status(200).send({success:true, message:"successfully updated "});
        });   
        });    
let google = require('googleapis');
let authentication = require("./authentication");
 
function getData(auth, callback) {
  var sheets = google.sheets('v4');
  sheets.spreadsheets.values.get({
    auth: auth,
    spreadsheetId: '1zgQDOVf15JCC_YGhxzmM3hrcvT07xa3TDrsitecVw0Q',
    range: 'Sheet4!B2:F', //Change Sheet1 if your worksheet's name is something else
  }, (err, response) => {
    if (err) {
      console.log('The API returned an error: ' + err);

      return;
    } 
    var rows = response.values;
    if (rows.length === 0) {
      console.log('No data found.');
    } else {
      for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        console.log(row[0]);
      }
      callback(rows);
    }
  });
}
 
function getDataFromIndex(callback){
    authentication.authenticate().then((auth)=>{
        getData(auth,callback);
    });
}

function getUserName(auth, userId,callback){
  var userName;
  var sheets = google.sheets('v4');
  sheets.spreadsheets.values.get({
    auth: auth,
    spreadsheetId: '1zgQDOVf15JCC_YGhxzmM3hrcvT07xa3TDrsitecVw0Q',
    range: 'Sheet1!A2:B', //Change Sheet1 if your worksheet's name is something else
  }, (err, response) => {
    if (err) {
      console.log('The API returned an error: ' + err);

      return;
    } 
    var rows = response.values;
    if (rows.length === 0) {
      console.log('No data found.');
    } else {
      for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        if(row[0] === userId){
          console.log("User name for "+row[0]+" is : "+row[1]);
          callback(row[1]);
          userName = row[1];
        }
        
      }
    }
  });
  return userName;
}

function getUserNameAuth(userId, callback){
  authentication.authenticate().then((auth)=>{
    getUserName(auth, userId,callback);
  });
}

function getDevice(auth, userId,callback){
  console.log("getDevice : ", userId);
  var sheets = google.sheets('v4');
  sheets.spreadsheets.values.get({
    auth: auth,
    spreadsheetId: '1zgQDOVf15JCC_YGhxzmM3hrcvT07xa3TDrsitecVw0Q',
    range: 'Sheet4!A2:G', //Change Sheet1 if your worksheet's name is something else
  }, (err, response) => {
    if (err) {
      console.log('The API returned an error: ' + err);

      return;
    } 
    var rows = response.values;
    if (rows.length === 0) {
      console.log('No data found.');
    } else {
      for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        console.log("User name for "+row[0]+" is : "+row[1]+" "+row[2]+" "+row[3]+" "+row[4]+" "+row[5]+" "+row[6]);
        if(row[6] === userId){
          console.log("User name for "+row[0]+" is : "+row[1]);
          callback(row);          
        }
        
      }
    }
  });
  
}

function getDeviceAuth(userId, callback){
  authentication.authenticate().then((auth)=>{
    getDevice(auth, userId,callback);
  });
}


function updateData(auth,userId,deviceName, callback) {
  
  var sheets = google.sheets('v4');

  sheets.spreadsheets.values.get({
    auth: auth,
    spreadsheetId: '1zgQDOVf15JCC_YGhxzmM3hrcvT07xa3TDrsitecVw0Q',
    range: 'Sheet4!A2:G', //Change Sheet1 if your worksheet's name is something else
  }, (err, response) => {
    if (err) {
      console.log('The API returned an error: ' + err);

      return;
    } 
    var rows = response.values;
    if (rows.length === 0) {
      console.log('No data found.');
    } else {
      for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        if(deviceName === row[1]){
          rows[i][6] = userId;
        }
        console.log(row[0]);
      }  
      //Updating rows data
      sheets.spreadsheets.values.update({
        auth: auth,
        spreadsheetId: '1zgQDOVf15JCC_YGhxzmM3hrcvT07xa3TDrsitecVw0Q',
        range: 'Sheet4!A2:G',
        valueInputOption: 'USER_ENTERED',
        resource: {range: 'Sheet4!A2:G',
            majorDimension: 'ROWS',
            values: rows}
    } ,(err, resp) => {
    
        if (err) {
            console.log('Data Error :', err)
            return;
        }
        callback();
        
    
    });
    }
  });  
}

function updateDataAuth(userId,deviceName, callback){
  authentication.authenticate().then((auth)=>{
    updateData(auth, userId,deviceName, callback);
  });
}

module.exports = {
    getDataFromIndex, getUserNameAuth, getDeviceAuth, updateDataAuth
} 
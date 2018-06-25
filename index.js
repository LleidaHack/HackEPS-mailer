let google = require('googleapis');
let authentication = require("./authentication");

var express = require('express');
var app = express();


function appendData(auth, email) {
  var sheets = google.sheets('v4');
  sheets.spreadsheets.values.append({
    auth: auth,
    spreadsheetId: '1tl-wWFz-SSUvi5Ug1h3-q3eWN4VgzVu9K-85M1ITmlc',
    range: 'A:E', //Change Sheet1 if your worksheet's name is something else
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    resource: {
      values: [[email]]
    }
  }, (err, response) => {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    } else {
        console.log("Appended");
    }
  });
}



app.get('/:email', function(req, res){
  authentication.authenticate().then((auth)=>{
    appendData(auth, req.params.email);
  });
});

app.listen(process.env.PORT || 8000, function() {
	console.log('Server ON');
});
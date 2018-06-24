let google = require('googleapis');
let authentication = require("./authentication");


function appendData(auth) {
  var sheets = google.sheets('v4');
  sheets.spreadsheets.values.append({
    auth: auth,
    spreadsheetId: '1tl-wWFz-SSUvi5Ug1h3-q3eWN4VgzVu9K-85M1ITmlc',
    range: 'A:E', //Change Sheet1 if your worksheet's name is something else
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    resource: {
      values: [["oda@gmail.com"]]
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

authentication.authenticate().then((auth)=>{
    appendData(auth);
});

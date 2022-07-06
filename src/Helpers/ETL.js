const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
 
function listFiles(auth) {
    const drive = google.drive({version: 'v3', auth});
    drive.files.list({
      pageSize: 10,
      fields: 'nextPageToken, files(id, name)',
    }, (err, res) => {
      if (err) return console.log('The API returned an error: ' + err);
      const files = res.data.files;
      if (files.length) {
        console.log('Files:');
        files.map((file) => {
          console.log(`${file.name} (${file.id})`);
          if(file.name == 'Prueba 1'){
            extractDataFromSpreedSheet(file.id, auth);
          }
        });
      } else {
        console.log('No files found.');
      }
    });
}

function extractDataFromSpreedSheet(spreadsheetID,auth) {
  console.log(spreadsheetID);
  const sheets = google.sheets({version: 'v4', auth});
  sheets.spreadsheets.values.get({
    spreadsheetId: spreadsheetID,
    range: 'Sheet1',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const rows = res.data.values;
    if (rows.length) {
      console.log('Name, Major:');
      // Print columns A and E, which correspond to indices 0 and 4.
      rows.map((row) => {
        console.log(`${row[0]}, ${row[4]}`);
      });
    } else {
      console.log('No data found.');
    }
  });
}

exports.listFiles = listFiles;
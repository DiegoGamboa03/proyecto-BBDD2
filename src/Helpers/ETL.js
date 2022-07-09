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
            extractDataFromSpreedSheetFormat1(file.id, auth);
          }
        });
      } else {
        console.log('No files found.');
      }
    });
}

function extractDataFromSpreedSheetFormat1(spreadsheetID,auth) {
  console.log(spreadsheetID);
  const sheets = google.sheets({version: 'v4', auth});
  sheets.spreadsheets.values.get({
    spreadsheetId: spreadsheetID,
    range: "FORMATO INGRESO AL IVSS!A11:U",
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const rows = res.data.values;
    if (rows.length) {
      rows.map((row) => {
        //console.log(`${row[0]}, ${row[1]}, ${row[2]},${row[3]}, ${row[4]}, ${row[5]},${row[6]}, ${row[7]}, ${row[8]},${row[9]}, ${row[10]}, ${row[11]},${row[12]}, ${row[13]}, ${row[14]}`);
        if(!(row[0] || row[1]) == ""){
          uploadFormat1(row)
        }
      });
    } else {
      console.log('No data found.');
    }
  });
}

function uploadFormat1(row){
  //Separamos el nombre completo del trabajador en partes
  const workerCompleteName = String(row[3]).split(" ");
  //es zurdo
  let islefthanded;
  if(String(row[8]).length){
    islefthanded = true;
  }else if(String(row[9]).length){
    islefthanded = false;
  }
  //Fecha de nacimiento
  const birthDate = String(row[10]) +"-"+ String(row[11]) +"-"+ String(row[12]);
  //Creacion del JSON
  var worker = {
    entryDateIVSS: row[0],
    COD: row[1],
    ID: row[2],
    firstName: workerCompleteName[0],
    middleName: workerCompleteName[1],
    surname: workerCompleteName[2],
    secondSurname: workerCompleteName[3],
    secureNumber: row[5],
    birthDate: row[6],
    genre: row[7],
    isLeftHanded: islefthanded,
    birthdate: birthDate,
    weeklySalary: row[13],
    ocupation: row[14],
    address: row[17]
  }
  let jsonWorker = JSON.stringify(worker);

  const sql = 'INSERT INTO Trabajadores SET ?';


}

exports.listFiles = listFiles;
const fs = require('fs');
const path = require('path');
const promisify = require('es6-promisify');
const Google = require('googleapis');

const getClient = require('api');

const main = async () => {
  // get auth client
  const client = await(getClient());

  // init api
  const sheets = Google.sheets('v4');

  const asyncAppend = promisify(sheets.spreadsheets.values.append, sheets.spreadsheets.values);

  // append data
  await asyncAppend({
    auth: client,
    spreadsheetId: 'sflasdhflsh293lasdlsdf',
    range: `Sheet1!A:E`,
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    resource: {
      range: `${name}!A:E`,
      majorDimension: "ROWS",
      values: [
        [
          '2018-01-01',
          23.4,
          1.2,
          9.5,
          "looks good"
        ]
      ]
    }
  })
}

main().catch(err => {
  console.error(err);

  throw err;
});
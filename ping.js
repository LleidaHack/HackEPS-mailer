const promisify = require('es6-promisify');
const Google = require('googleapis');

const getClient = require('api');

const main = async () => {
  // get the authenticated client
  const client = await(getClient());

  // init the API
  const sheets = Google.sheets('v4');

  const asyncGet = promisify(sheets.spreadsheets.values.get, sheets.spreadsheets.values);

  // get spreadsheet data from cells: Sheet1, A1:B1
  const res = await asyncGet({
    auth: client,
    spreadsheetId: '23jsdfljslfkjsdkfjsldfjsdf',
    range: 'Sheet1!A1:B'
  });

  console.log(res);
  console.log('Spreadsheet accessed successfully!')
}

main().catch(err => {
  console.error(err);

  throw err;
});
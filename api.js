const fs = require('fs');
const path = require('path');
const promisify = require('es6-promisify');
const readline = require('readline');
const GoogleAuth = require('google-auth-library');

const credentialsPath = path.join(__dirname, '.credentials');
const credentialsFile = path.join(credentialsPath, 'client_secret.json');
const tokenFile = path.join(credentialsPath, 'token.json');


const getClient = async () => {
  const credentials = require(credentialsPath);

  const {
    installed: {
      client_secret: clientSecret,
      client_id: clientId,
      redirect_uris: redirectUrls
    }
  } = credentials;

  const redirectUrl = redirectUrls[0];

  const auth = new GoogleAuth();
  const client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  try {
    client.credentials = require(tokenFile);
  } catch (err) {
    console.warn(`Error loading token: ${err}`);

    client.credentials = getNewToken(client);
  }

  return client;
}


const getNewToken = async client => {
  // if not running in CI then tell user to run the script locally
  if (process.env.CI) {
    throw new Error('The OAuth token has expired. Please run this script locally to obtain a new token.');
  }

  // generate auth URL
  const authUrl = client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/spreadsheets']
  });

  // tell user to visit the URL
  console.log(`\nPlease visit the following URL to obtain an authorisation code:`, authUrl);

  // let user input the obtained code
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const code = await new Promise(resolve => {
    rl.question(`\nEnter the code from that page here: `, resolve);
  });

  rl.close();

  // get token corresponding to the code from Google
  const token = JSON.stringify(await promisify(client.getToken, client)(code), null, 2);

  console.log('New token:', token);

  // save token
  fs.writeFileSync(tokenFile, token);

  console.log(`\nNew auth token has been saved to disk.`);

  return token;
}

module.exports = {
  getClient : 'api'
}
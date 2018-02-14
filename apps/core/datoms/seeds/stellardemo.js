  /**
   * Define some query data.
   */


// should check if single quotes on field names are needed
  const componentdatoms = [
    { ':db/id': -1,
      'moduleid': 'stellardemo',
      'modulename': 'Stellar Demo',
      'moduleactionsets': -3,
      'rootcomponent': -2
    },
    { ':db/id': -2,
      'componentsname': 'Stellar Demo Root component',
      'componentstype': 'root',
      'componentid': 'stellardemo',
    },
    { ':db/id': -3,
      actionsetid: 'stellardemoactions',
      modulename: 'Stellar Demo actions',
      moduleactions: [-5, -7, -8, -9]
    },
    {
      ':db/id': -4,
      'componentsname': 'textareatocreatetask',
      'componentsparents': -2,
      'componentstype': 'textarea',
      'placeholder': "Enter your task content."
    },
    {
      ':db/id': -5,
      'componentsname': 'create_stellar_account',
      'componentsparents': -2,
      'componentstype': 'action',
      'componentsfunction': `({StellarSdk, request, transact, conn}) {

StellarSdk.Network.useTestNetwork();
const issuer_pair = StellarSdk.Keypair.random()
const authorization_pair = StellarSdk.Keypair.random()

const issuer_account = {
  secret: issuer_pair.secret(),
  public: issuer_pair.publicKey()
}

const authorization_account = {
  secret: authorization_pair.secret(),
  public: authorization_pair.publicKey()
}

console.log(JSON.stringify(issuer_account))
console.log(JSON.stringify(authorization_account))

const HORIZON_SERVER = 'https://horizon-testnet.stellar.org'

var url = HORIZON_SERVER + '/friendbot'

request.get({
  url: url,
  qs: { addr: authorization_account.public },
  json: true
}, function (error, response, body) {
  if (error || response.statusCode !== 200) {
    console.error('ERROR!', error || body);
    console.error()
    return
  }
  console.log('SUCCESS! You have a new account :)', body);
  transact(conn, [{
    ':db/id': -1,
    account_object: JSON.stringify(body),
    stellar_account_name: 'authorization',
    publickey: authorization_account.public,
    privatekey: authorization_account.secret
  }])
});

request.get({
  url: url,
  qs: { addr: issuer_account.public },
  json: true
}, function (error, response, body) {
  if (error || response.statusCode !== 200) {
    console.error('ERROR!', error || body);
    console.error()
    return
  }
  console.log('SUCCESS! You have a new account :)', body);
  transact(conn, [{
    ':db/id': -1,
    account_object: JSON.stringify(body),
    stellar_account_name: 'issuer',
    publickey: issuer_account.public,
    privatekey: issuer_account.secret
  }])
});


      }`
    },
    {
      ':db/id': -6,
      'componentsname': 'Subcomponent',
      'componentsparents': -2,
      'componentstype': 'subcomponent'
    },
    {
      ':db/id': -7,
      'componentsname': 'check_stellar_balances',
      'componentsparents': -2,
      'componentstype': 'action',
      'componentsfunction': `({StellarSdk, request, transact, datascript, conn}) {
      }`
    },
    {
      ':db/id': -8,
      'componentsname': 'get_stellar_sequence',
      'componentsparents': -2,
      'componentstype': 'action',
      'componentsfunction': `({StellarSdk, request, axios, transact, datascript, conn}) {
      }`
    },
    {
      ':db/id': -9,
      'componentsname': 'create_stellar_asset',
      'componentsparents': -2,
      'componentstype': 'action',
      'componentsfunction': `({StellarSdk, request, axios, transact, datascript, conn}) {
      }`
    }
  ]

export default componentdatoms

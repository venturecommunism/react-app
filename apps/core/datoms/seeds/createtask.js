  /**
   * Define some query data.
   */


// should check if single quotes on field names are needed
  const componentdatoms = [
    { ':db/id': -1,
      'moduleid': 'createtask',
      'modulename': 'Create task',
      'moduleactionsets': -3,
      'rootcomponent': -2
    },
    { ':db/id': -2,
      'componentsname': 'Create task Root component',
      'componentstype': 'root',
      'componentid': 'createtask',
    },
    { ':db/id': -3,
      actionsetid: 'createtaskactions',
      modulename: 'Create task actions',
      moduleactions: [-5, -7]
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

StellarSdk.Network.useTestNetwork()
StellarSdk.Config.setAllowHttp(true)

const HORIZON_SERVER = 'https://horizon-testnet.stellar.org'
const server = new StellarSdk.Server(HORIZON_SERVER)

var accountsNames = ['issuer', 'authorization'];

accountsNames.forEach(acc => {
  console.log(acc)

  const csbQuery = \`[:find ?u ?pub ?priv
               :where [?u "publickey" ?pub]
                      [?u "privatekey" ?priv]
                      [?u "stellar_account_name" "\$\{acc\}"]]\`

const db = datascript.db(conn)
const csbArgs = [csbQuery, db]
const csbResult = datascript.q(...csbArgs)

console.log(csbResult)

  // the JS SDK uses promises for most actions, such as retrieving an account
  server.loadAccount(csbResult[0][1]).then(function(accountDetails) {
    console.log('Balances for account: ' + csbResult[0][1])
    accountDetails.balances.forEach(function(balance) {
      console.log(balance)
    })
  })


})

      }`
    },
  ]

export default componentdatoms

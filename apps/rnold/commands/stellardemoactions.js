
export default {
  create_stellar_account({StellarSdk, request, transact, conn}) {

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


  },
  check_stellar_balances({StellarSdk, request, transact, datascript, conn}) {
  },
  get_stellar_sequence({StellarSdk, request, axios, transact, datascript, conn}) {
    console.log('get stellar seq')
  },
  create_stellar_asset({StellarSdk, request, axios, transact, datascript, conn}) {
  }
}


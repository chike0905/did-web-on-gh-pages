const jose = require('jose');
const crypto = require('crypto');

const CONFIG = require('./config.json');
const DID = `did:web:${CONFIG.DOMAIN}:${CONFIG.REPOSITORY}`;
const JWK = require('../keys/jwk.json');


const didJWT = require('did-jwt');
const Resolver = require('did-resolver');
const getResolver = require('web-did-resolver').getResolver;


const main = async () => {
  console.log('=== Import JWK ===');
  const privateKey = await jose.importJWK(JWK, 'ES256K');

  console.log('=== Sign with JWK ===');
  const jwt = new jose.SignJWT({ 'claim': 'this is Example Claim' })
    .setProtectedHeader({ alg: 'ES256K' })
    .setIssuedAt()
    .setIssuer(DID)
    .setAudience('urn:example:audience')
  const signed = await jwt.sign(privateKey);
  console.log(`Signed JWT: ${signed}`);

  console.log('=== Verify JWK with did-jwt ===');
  const webResolver = getResolver();
  const didResolver = new Resolver.Resolver({
    ...webResolver
  });
  let verificationResponse = await didJWT.verifyJWT(signed, {
    resolver: didResolver,
    audience: 'urn:example:audience'
  }).catch((e) => {
    console.error(e);
    return undefined;
  });
  if (verificationResponse === undefined) {
    console.log('Verify JWK Failed')
    return;
  }
  console.log('Verify JWK Success')
  console.log(verificationResponse)
}

main();
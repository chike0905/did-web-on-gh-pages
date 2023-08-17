const jose = require('jose');
const fs = require('fs');
const readlineSync = require('readline-sync');

// Setting
const CONFIG = require('./config.json');
const { exit } = require('process');

// Validate Config
if (CONFIG.DOMAIN == '{GitHubUserName}.github.io') {
  console.log(`ERROR: Domain in config.json is default ({GitHubUserName}.github.io). Please set your domain.`)
  exit(1);
}

if (CONFIG.REPOSITORY == 'did-web-on-gh-pages') {
  console.log(`WARN: Domain in config.json is default (did-web-on-gh-pages).`);
  if (!readlineSync.keyInYN(`Is the repository name correct?`)) {
    exit(1);
  }
}

// Templates
const DID = `did:web:${CONFIG.DOMAIN}:${CONFIG.REPOSITORY}`;
const DID_DOCUMENT_FRAME = {
  "@context": "https://www.w3.org/ns/did/v1",
  "id": '',
  "verificationMethod": [],
  "authentication": [],
  "assertionMethod": [],
}

const main = async () => {
  // generate KeyPair
  const { publicKey, privateKey } = await jose.generateKeyPair('ES256K', { crv: 'secp256k1' });
  const publicKeyJWK = await jose.exportJWK(publicKey);
  const privateKeyJWK = await jose.exportJWK(privateKey);

  const key = {
    "id": `${DID}#key1`,
    "type": "EcdsaSecp256k1VerificationKey2019",
    "controller": `${DID}`,
    "publicKeyJwk": publicKeyJWK
  }
  const didDocument = DID_DOCUMENT_FRAME;
  didDocument.id = key.controller;
  didDocument.verificationMethod = [key];
  didDocument.authentication = [key.id];
  didDocument.assertionMethod = [key.id];

  console.log('=== GENERATED DID DOCUMENT (./docs/did.json) ===');
  console.log(JSON.stringify(didDocument, null, 2));
  fs.writeFileSync('./docs/did.json', JSON.stringify(didDocument, null, 2));

  console.log('=== GENERATED PRIVATEKEY JWK (./keys/jwk.json) ===');
  console.log(JSON.stringify(privateKeyJWK, null, 2));
  fs.writeFileSync('./keys/jwk.json', JSON.stringify(privateKeyJWK, null, 2));
  console.log('NOTE: DO NOT SHARE THE JWK\n');

  console.log(`=== NEXT STEP ===
  1. commit and push the generated DID Document.
      git add ./docs/did.json
      git commit -m "generate did document"
      git push
  2. Setup github pages on GitHub so that publishes 'docs' directory of main branch in this repository.
      https://docs.github.com/ja/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
  3. Check Your Github Pages are deployed. 
  4. Resolve generated DID:web in Universal Resolver
      Generated DID: ${DID}
  `)
};

main();
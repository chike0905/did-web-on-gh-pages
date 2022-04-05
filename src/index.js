const { randomBytes } = require('crypto');
const secp256k1 = require('secp256k1');
const bs58 = require('bs58');
const fs = require('fs');

// Setting
const DOMAIN = 'chike.xyz';
const GH_PROJECT = 'did-web-on-gh-pages';


// Templates
const DID = `did:web:${DOMAIN}:${GH_PROJECT}`;
const DID_DOCUMENT_FRAME = {
  "@context": "https://www.w3.org/ns/did/v1",
  "id": '',
  "verificationMethod": [],
  "authentication": [],
  "assertionMethod": [],
}

const main = async () => {
  // generate privKey
  let privKey
  do {
    privKey = randomBytes(32)
  } while (!secp256k1.privateKeyVerify(privKey));

  // get the public key in a compressed format
  const pubKey = secp256k1.publicKeyCreate(privKey);

  const key = {
    "id": `${DID}#key1`,
    "type": "Ed25519VerificationKey2018",
    "controller": `${DID}`,
    "publicKeyBase58": bs58.encode(pubKey)
  }
  const didDocument = DID_DOCUMENT_FRAME;
  didDocument.id = key.controller;
  didDocument.verificationMethod = [key];
  didDocument.authentication = [key.id];
  didDocument.assertionMethod = [key.id];

  console.log('===GENERATED DID DOCUMENT===');
  console.log(JSON.stringify(didDocument, null, 2));
  fs.writeFileSync('./docs/did.json', JSON.stringify(didDocument, null, 2));
};

main();
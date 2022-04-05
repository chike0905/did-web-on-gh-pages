const { randomBytes } = require('crypto');
const secp256k1 = require('secp256k1');
const bs58 = require('bs58');

// Setting
const DOMAIN = 'chike.xyz';
const GH_PROJECT = 'id-web-on-gh-pages';


// MAIN
const DID = `did:web:${DOMAIN}:${GH_PROJECT}`;
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

  console.log(JSON.stringify(key, null, 2));
};

main();
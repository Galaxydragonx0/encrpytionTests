var forge = require('node-forge');
const fs = require('fs');
var pubkey = fs.readFileSync("publickey.pem", 'utf8')

var publicKey = forge.pki.publicKeyFromPem(pubkey);


var secretMessage = "Hello World";
secretMessage = forge.util.encodeUtf8(secretMessage);

var encrypted = publicKey.encrypt(secretMessage, "RSA-OAEP");

console.log(encrypted)

var base64 = forge.util.encode64(encrypted);

var encryptedMessage = base64;



// console.log(decrypt);

// , {
//     md: forge.md.sha256.create(),
//     mgf1: forge.mgf1.create()
// }

fs.writeFileSync('message.txt', encryptedMessage);


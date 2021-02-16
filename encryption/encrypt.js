var forge = require('node-forge');
const fs = require('fs');
var pubkey = fs.readFileSync(path("public_key.pem"), 'utf8')

var publicKey = forge.pki.publicKeyFromPem(pubkey);

var secretMessage = "Hello World";
var encrypted = publicKey.encrypt(secretMessage, "RSA-OAEP", {
            md: forge.md.sha256.create(),
            mgf1: forge.mgf1.create()
        });
var base64 = forge.util.encode64(encrypted);
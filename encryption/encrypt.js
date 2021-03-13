var forge = require('node-forge');
const fs = require('fs');


/*
var keys = forge.pki.rsa.generateKeyPair(2048);


// saves public key to pem 
var clientPublicKey = keys.publicKey;
var clientPrivateKey = keys.privateKey;

// saves public key to pem 
fs.writeFileSync("C:/Users/USER/Desktop/encrpytionTests/encryption/clientpublickey.pem",forge.pki.publicKeyToPem(clientPublicKey),'utf8');
fs.writeFileSync("C:/Users/USER/Desktop/encrpytionTests/encryption/clientprivatekey.pem",forge.pki.privateKeyToPem(clientPrivateKey),'utf8')


// console.log(publicKey);

// reads public key from backend 
var pubkey = fs.readFileSync ("C:/Users/USER/Desktop/encrpytionTests/encryption/publickey.pem", 'utf8')

//extracts public key 
var publicKey = forge.pki.publicKeyFromPem(pubkey);


var secretMessage = "Hello World";
//encode message to bytes 
secretMessage = forge.util.encodeUtf8(secretMessage);

//encrypt the message with the publickey 
var encrypted = publicKey.encrypt(secretMessage, "RSA-OAEP");


console.log(typeof encrypted)

// encrypt the already encrypted message in base 64
var base64 = forge.util.encode64(encrypted);

var encryptedMessage = base64;



fs.writeFileSync('C:/Users/USER/Desktop/encrpytionTests/encryption/message.txt', encryptedMessage);

*/

//READ THE PRIVATE KEY 
var privkey = fs.readFileSync ("C:/Users/USER/Desktop/encrpytionTests/encryption/clientprivatekey.pem",'utf8');

var privateKey = forge.pki.privateKeyFromPem(privkey);

// READ THE MESSAGE FROM THE TEXT (NONE BYTES ARRAY IN BASE64 => STRING)
var message = fs.readFileSync("C:/Users/USER/Desktop/encrpytionTests/encryption/server_message.txt",'utf8');

console.log(message);

//DECODE THE MESSAGE FROM BAS64
var encryptedMessage = forge.util.decode64(message);
// console.log("this is without the base64: " + encryptedMessage)

var serverMessage = forge.util.decodeUtf8(privateKey.decrypt(encryptedMessage, 'RSA-OAEP', {
    md: forge.md.sha1.create(),
    mgf1: {
        md: forge.md.sha1.create()
    }
}));

// console.log("this is the message: "+ forge.util.text.utf8.decode(encryptedMessage));



//

console.log("this is the final message:" + serverMessage);


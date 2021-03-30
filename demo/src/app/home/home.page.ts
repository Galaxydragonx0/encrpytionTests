import {Component, OnInit} from '@angular/core';
import * as forge from 'node-forge'
import * as fs from 'fs'
import { FormControl, FormGroup } from '@angular/forms';
import { MessagingService } from '../services/messaging.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  message : FormGroup;
  pubkey : any;
  constructor(private key: MessagingService) {}

  ngOnInit() {

    this.message = new FormGroup({
      'message' : new FormControl(null)
    })

    this.key.savePublicKey().subscribe(response => {
      this.pubkey = response;
      console.log(this.pubkey);
      localStorage.setItem('publickey',this.pubkey)
    }, error => {});
  }



  //SERVER -> CLIENT -> SERVER  ENCRYPTION/DECRYPTION

  getPublicKey() {

    // reads public key from backend

    //  the service should store the public key in the LocalStorage or the Session Storage
    var pubkey  = localStorage.getItem('publickey');


    // var pubkey = fs.readFileSync ("C:/Users/USER/Desktop/encrpytionTests/encryption/publickey.pem", 'utf8')

    //extracts public key
    var publicKey = forge.pki.publicKeyFromPem(pubkey);
    console.log('This is the gotten public key:'+ publicKey);
    return publicKey;
  }



  encryptUserMessage(message) {
    //messaage.target.value
    var secretMessage = message;
    //encode message to bytes
    secretMessage = forge.util.encodeUtf8(secretMessage);


    var publicKey = this.getPublicKey();
    //encrypt the message with the publickey
    var encrypted = publicKey.encrypt(secretMessage, "RSA-OAEP");


    // encrypt the already encrypted message in base 64
    var base64 = forge.util.encode64(encrypted);

    var encryptedMessage = base64;
    console.log( encryptedMessage);
    return encryptedMessage;
    // writes base64 encrypted message to txt file
    // fs.writeFileSync('C:/Users/USER/Desktop/encrpytionTests/encryption/message.txt', encryptedMessage);

  }


  onSubmit(){
    console.log(this.message.controls.message.value);
    var userMessage = this.message.controls.message.value;
    var encryptedUserMessage = this.encryptUserMessage(userMessage);
    var json = {'message': encryptedUserMessage};
    var message = JSON.stringify(json);

    console.log(message);
    this.key.returnUserMessage(message);
  }





  // CLIENT -> SERVER -> CLIENT ENCRYPTION/DECRYPTION

  /*
  //KEY PAIR GENERATION
  var keys = forge.pki.rsa.generateKeyPair(2048);


  // saves public and private keys to variables
  var clientPublicKey = keys.publicKey;
  var clientPrivateKey = keys.privateKey;

  // saves public and private keys to pem
  fs.writeFileSync("C:/Users/USER/Desktop/encrpytionTests/encryption/clientpublickey.pem",forge.pki.publicKeyToPem(clientPublicKey),'utf8');
  fs.writeFileSync("C:/Users/USER/Desktop/encrpytionTests/encryption/clientprivatekey.pem",forge.pki.privateKeyToPem(clientPrivateKey),'utf8')
  */

  /*
  //READ THE PRIVATE KEY
  var privkey = fs.readFileSync ("C:/Users/USER/Desktop/encrpytionTests/encryption/clientprivatekey.pem",'utf8');

  var privateKey = forge.pki.privateKeyFromPem(privkey);

  // READ THE MESSAGE FROM THE TEXT (NONE BYTES ARRAY IN BASE64 => STRING)
  var message = fs.readFileSync("C:/Users/USER/Desktop/encrpytionTests/encryption/server_message.txt",'utf8');

  console.log(message);

  //DECODE THE MESSAGE FROM BAS64
  var encryptedMessage = forge.util.decode64(message);

  var serverMessage = forge.util.decodeUtf8(privateKey.decrypt(encryptedMessage, 'RSA-OAEP', {
      md: forge.md.sha1.create(),
      mgf1: {
          md: forge.md.sha1.create()
      }
  }));


  console.log("this is the final message:" + serverMessage);

  */
}

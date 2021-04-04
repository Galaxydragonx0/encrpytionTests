import {Component, OnInit} from '@angular/core';
import * as forge from 'node-forge'
import * as fs from 'fs'
import { FormControl, FormGroup } from '@angular/forms';
import { MessagingService } from '../services/messaging.service';
import {Comments} from '../models/comments-model';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  message : FormGroup;
  pubkey : any;
  comments : Comments[] = [];

  constructor(private key: MessagingService) {}


  ngOnInit() {

    this.message = new FormGroup({
      'message' : new FormControl(null)
    })

    var commentObj = new Comments;
    commentObj.user = "System";
    commentObj.message ="Hi welcome to the thread";

    this.comments.push(commentObj);

    this.key.savePublicKey().subscribe(response => {
      this.pubkey = response;
      console.log(this.pubkey);
      localStorage.setItem('publickey',this.pubkey)
    }, error => {});
  }



  //SERVER -> CLIENT -> SERVER  ENCRYPTION/DECRYPTION

  getPublicKey() {

    // reads public key from backend

    // the service should store the public key in the LocalStorage or the Session Storage
    var pubkey  = localStorage.getItem('publickey');

    // extracts public key
    var publicKey = forge.pki.publicKeyFromPem(pubkey);
    console.log('This is the gotten public key:'+ publicKey);
    return publicKey;
  }

  checkArrayLength(){
    if(this.comments.length > 0)
      return true;

    return false;
  }

  encryptUserMessage(message) {

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

  }


  onSubmit(){
    console.log(this.message.controls.message.value);

    var comObj = new Comments;
    var userMessage = this.message.controls.message.value;
    comObj.message = userMessage;
    // comObj.user = 'A';

    this.comments.push(comObj);
    this.message.reset();
    // console.log(this.comments);

    var encryptedUserMessage = this.encryptUserMessage(userMessage);
    var json = {'message': encryptedUserMessage};
    var message = JSON.stringify(json);

    // console.log(message);
    this.key.returnUserMessage(message);
  }


}

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  baseUrl = '';
  constructor(private http: HttpClient) { }

  savePublicKey(){
    const res = this.http.get(`${environment.api}${this.baseUrl}/getpublickey`);

    console.log(res.toString());

    localStorage.setItem('publickey', res.toString());

    // return for testing -> not necessary
    return res;
  }
}

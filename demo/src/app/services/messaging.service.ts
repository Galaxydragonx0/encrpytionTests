import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  baseUrl = 'api';
  constructor(private http: HttpClient) { }

  savePublicKey(){
    const res = this.http.get(`${environment.api}${this.baseUrl}/publickey`);
    return res;
  }


  returnUserMessage(data){
    return this.http.post(`${environment.api}${this.baseUrl}/message`, data, {headers : new HttpHeaders({ 'Content-Type': 'application/json' })});
  }
}

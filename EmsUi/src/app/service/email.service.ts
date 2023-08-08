import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor( private http:HttpClient ) { }

  baseUrl='http://localhost:5500/api';

  sendemailbulks(email:any){
    console.log('hhhh',email);
    
    return this.http.post(`${this.baseUrl}/email`,email)
  }

}

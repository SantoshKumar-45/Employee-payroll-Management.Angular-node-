import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  baseUrl = 'http://localhost:5500/api';

  constructor(private http: HttpClient) { }


  // check password match or mismatch 
  checkPassword() {
    return this.http.get(`${this.baseUrl}/password`);
  }

  // update passowrd
  updatePassword(userId: any, oldPassword: any,newPassword: any) {
    const payload = {
      userId: userId,
      oldPassword:oldPassword,
      newPassword: newPassword
    };
    console.log(payload);
    
    return this.http.post(`${this.baseUrl}/password/Update`, payload);
  }

}

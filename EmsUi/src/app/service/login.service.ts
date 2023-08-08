import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  baseurl = 'http://localhost:5500/api/user';

  Adminlogin(UserData: any) {
    return this.http.post(`${this.baseurl}`, UserData);
  }
  Changepassword(userid: any) {
    return this.http.put(`${this.baseurl}/`,userid)
  }


  logindata = new BehaviorSubject<any>(null);


  get Islogin(): boolean {
    let AuthToken = localStorage.getItem('token');
    return AuthToken !== null ? true : false;
  }

}

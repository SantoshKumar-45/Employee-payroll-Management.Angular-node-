import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SalarySheetService {

  baseurl = 'http://localhost:5500/api';
  constructor(private http: HttpClient) { }

  // export salary sheet in excel file
  downloadSalarySheet() {
    return this.http.get(`${this.baseurl}/SalarySheet/Download/export` );
  }

   
  //get salary sheet by title according show 
  getSalarySheetbyTitle(title: any) {
    return this.http.get(`${this.baseurl}/SalarySheet/${title}`)
  }
}

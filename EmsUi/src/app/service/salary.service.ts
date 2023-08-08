import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SalaryService {

  baseUrl = 'http://localhost:5500/api';
  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  //get salary save attendence date 
  getSalarySaveDate() {
    return this.http.get(`${this.baseUrl}/savedate`);
  }
  //not use 
  saveAttendenceData(dataArray: any) {
    return this.http.post(`${this.baseUrl}/attendence`, dataArray);
  }
}

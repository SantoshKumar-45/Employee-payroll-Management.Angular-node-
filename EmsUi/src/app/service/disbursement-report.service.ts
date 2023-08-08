import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DisbursementReportService {
  baseUrl = 'http://localhost:5500/api';

  constructor(private http: HttpClient) { }


  //disbursement Report get by title  
  getEmplDis_ReportByTitle(title: any) {
      return this.http.get(`${this.baseUrl}/disbursementReport/title?title=${title}`);
  }
  
  //Download pdf 
downloadPdfdisbursementReports(){
  return this.http.get(`${this.baseUrl}/disbursementReport//download/pdf`)
}
  
}

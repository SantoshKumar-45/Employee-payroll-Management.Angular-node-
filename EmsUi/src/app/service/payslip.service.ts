import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PayslipService {
  baseurl = 'http://localhost:5500/api';
  constructor(private http: HttpClient) { }

  getPayslipData() {
    return this.http.get(`${this.baseurl}/payslip`);
  }
  // get employee payslip
  getByEmployeePayslip(id:number,tilte:any){   
    console.log(id,tilte);    
    return this.http.get(`${this.baseurl}/payslip/${id}/${tilte}`)
  }

 // Table of those who will get salary
 getEmpByDate(date:string) {
  return this.http.get(`${this.baseurl}/payslip/${date}`);
}

// get sent email payslip data 
getPayslipSentData(){
  return this.http.get(`${this.baseurl}/payslip/ReceiveEmail`)
}

}

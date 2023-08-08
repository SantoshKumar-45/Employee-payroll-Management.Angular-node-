import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmpAttendanceService {

  constructor(private http:HttpClient) { }
  baseUrl='http://localhost:5500/api';


  // // save all employee salary and attendance
  // saveAttendance(eachEmpAttenDtls:any,attendance:any){
  //   return this.http.post(`${this.baseUrl}/empAttendance`,{salary_details:eachEmpAttenDtls,salary:attendance})
  // }


   //get employees basics details eg. name and all salary details
   getEmployee() {
    return this.http.get(`${this.baseUrl}/empAttendance`);
  }

  // save all employee salary and attendance
  saveAttendance(eachEmpAttenDtls: any, attendance: any) {
    return this.http.post(`${this.baseUrl}/empAttendance`, { salary_details: eachEmpAttenDtls, salary: attendance })
  }

  //get title from salary table empAttendance/salary
  getTitle() {
    return this.http.get(`${this.baseUrl}/empAttendance/salary`)
  }

  //get save data through  title (month - year) 
  getSaveAttendance(title: any) {   
    return this.http.get(`${this.baseUrl}/empAttendance/${title}`)
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  baseUrl='http://localhost:5500/api';
 

   private Refresh = new Subject();
  
    constructor(private http: HttpClient) { }
  
  
  //employee add edit 
  getEmployees() {
    return this.http.get(`${this.baseUrl}/employee`);
  }

// ,salary: any, salary_head:any
// {formData:formData,Salary:salary,ArraySalary:salary_head}

  create(formData: any) {
    return this.http.post(`${this.baseUrl}/employee`, formData);
  }

  getById(id: any) {
    return this.http.get(`${this.baseUrl}/employee/${id}`)
  }

  update(id: any, data: any, salary:any) {
    return this.http.put(`${this.baseUrl}/employee/${id}`, {RectiveFormData:data,ModalFormData:salary});
  }

  // edit pic upload
  uploadProfilePic(id: any,formData: any){
    return this.http.patch('http://localhost:5500/api/empProfilePic/'+id, formData);
  }

  //refresh service
  setOprt(value: any) {
    this.Refresh.next(value);
  }

  getOprt() {
    return this.Refresh.asObservable();
  }

  
  }
  



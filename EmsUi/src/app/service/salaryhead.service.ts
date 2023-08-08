import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalaryheadService {


  baseurl = 'http://localhost:5500/api';

 private subject= new Subject<any>();

  constructor(private http: HttpClient) { }

  setSalaryHead(HeadData: any) {
    return this.http.post(`${this.baseurl}/salary/`, HeadData);
  }
  //Salary head
  getSalaryHead() {
    return this.http.get(`${this.baseurl}/salary/head`);
  }

  //get by id salary
  salaryheadById(id: any) {
    return this.http.get(`${this.baseurl}/salary/head/`, id);
  }

  // downloadSalarySheet(date:any){
  //   return this.http.post(`${this.baseurl}/DownloadSheet`,date)
  // }

  //for page refresh
sethead(value:any){
this.subject.next(value);
}
headRefresh(){
  this.subject.asObservable();
}

}

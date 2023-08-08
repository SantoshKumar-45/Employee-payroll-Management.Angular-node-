import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { SalarySheetService } from 'src/app/service/salary-sheet.service';
import { EmpAttendanceService } from 'src/app/service/emp-attendance.service';
@Component({
  selector: 'app-salary-sheet',
  templateUrl: './salary-sheet.component.html',
  styleUrls: ['./salary-sheet.component.css']
})
export class SalarySheetComponent implements OnInit {

  salarySheetList: boolean = true;
  salarySheetTable: boolean = false;
  backbtn: boolean = false;

  DateTitle: string = "";
  salarySheetData: any = [];

  constructor(
    private SalarySheetSvc: SalarySheetService,
    private empAttendanceSvc: EmpAttendanceService,
  ) { }

  ngOnInit(): void {
    this.getAttendanceSalaryTitle();
  }

  // get all title(month-year) from db  salary Table
  Title: any = [];
  getAttendanceSalaryTitle() {
    this.empAttendanceSvc.getTitle().subscribe((data: any) => {
      this.Title = data.Title
    })
  }

  //back to list button
  backtoDateList() {
    this.salarySheetList = true;
    this.salarySheetTable = false;
  }


  // show salary sheet use of salary_details table data
  salarySheet(title: string) {
    this.salarySheetList = false;
    this.salarySheetTable = true;
    this.backbtn = true;
    this.DateTitle = title;
    this.SalarySheetSvc.getSalarySheetbyTitle(this.DateTitle).subscribe(
      (data: any) => {
        if (data.status == true) {
          this.salarySheetData = data.salary_details;
          
        }
        if (data.status == false) {
          // console.log(data.err);
          alert(data.err.message)
        }
      })
  }




}

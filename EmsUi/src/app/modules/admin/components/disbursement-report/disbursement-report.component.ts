import { Component, OnInit } from '@angular/core';
import { DisbursementReportService } from 'src/app/service/disbursement-report.service';
import { SalaryService } from 'src/app/service/salary.service';
import * as moment from 'moment';
import { EmpAttendanceService } from 'src/app/service/emp-attendance.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-disbursement-report',
  templateUrl: './disbursement-report.component.html',
  styleUrls: ['./disbursement-report.component.css']
})
export class DisbursementReportComponent implements OnInit {

  emplDisbursementReport: any = [];
  DateofSaveSalary: any = [];
  tempDisbursementReport: any = [];

  disbursementTable: boolean = true;
  DisbursementTitleList: boolean = true;
  disbursementReportList: boolean = false;
  backButton: boolean = false;

  title: any = '';

  constructor(
    private reportSvc: DisbursementReportService,
    private salDateSvc: SalaryService,
    private empAttendanceSvc: EmpAttendanceService,
    private ngxUiLoaderService: NgxUiLoaderService

  ) { }
  ngOnInit(): void {
    
    this.getPreviousReport();
    this.getAttendanceSalaryTitle();
  }


  //one month after get data
  getPreviousReport() {
    const nextMonth = moment().add(-1, 'month');
    this.title = nextMonth.format("MMMM-YYYY");
   }

  Title: any = [];
  //get salary save title
  getAttendanceSalaryTitle() {
    this.empAttendanceSvc.getTitle().subscribe((data: any) => {
      this.Title = data.Title
    })
  }
  backtoList() {
    this.disbursementReportList = false;
    this.DisbursementTitleList = true;

  }
  // show disbursement report by title 
  showDisbursementReportbyTitle(title: any) {
    this.disbursementReportList = true;
    this.DisbursementTitleList = false;
    this.backButton = true;
    // this.month_year = title;
    this.reportSvc.getEmplDis_ReportByTitle(title).subscribe((DReport: any) => {
      this.tempDisbursementReport = DReport.emplReport;
    });
  }
 
  // download pdf service 
  downloadPdf() {
    this.reportSvc.downloadPdfdisbursementReports().subscribe((res: any) => {
      console.log('wwwwwwwwwwwwww',res);

    })
  }


  



}

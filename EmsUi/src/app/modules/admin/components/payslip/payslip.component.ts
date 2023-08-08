import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { EmailService } from 'src/app/service/email.service';
import { EmpAttendanceService } from 'src/app/service/emp-attendance.service';
import { PayslipService } from 'src/app/service/payslip.service';

@Component({
  selector: 'app-payslip',
  templateUrl: './payslip.component.html',
  styleUrls: ['./payslip.component.css']
})
export class PayslipComponent implements OnInit {

  payslipList: boolean = true;
  payslipTable: boolean = false;
  payslipBackBtn: boolean = false;

  DateTitle: string = "";
  employeeData: any = [];
  employeeList: any = [];

  tempData: any = []

  isLoading: boolean = false;

  PayslipListContainer: boolean = true;
  employeePayslipContainer: boolean = false;



  constructor(
    private payslipSvc: PayslipService,
    private empAttendanceSvc: EmpAttendanceService,
    private emailSvc: EmailService,
    private ngxUiLoaderService: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.getAttendanceSalaryTitle();
    this.IsCheckedpayslipSent();
  }

  // get all title(month-year) from db  salary Table
  Title: any = [];
  getAttendanceSalaryTitle() {
    this.empAttendanceSvc.getTitle().subscribe((data: any) => {
      this.Title = data.Title
    })
  }

  // payslip list for show
  employeePaysliplist() {
    this.payslipSvc.getPayslipData().subscribe((empldata: any) => {
      this.employeeList = empldata.empData

    })
  }

  // Table of those who will get salary
  empListForPayslip(title: string) {
    this.DateTitle = title;
    this.payslipList = false;
    this.payslipTable = true;
    this.payslipBackBtn = true;
    //get employee list data
    this.payslipSvc.getEmpByDate(this.DateTitle).subscribe((data: any) => {
      this.employeeList = data.empData;
      //filter send payslip data with id & title 
      this.tempData.filter((k: any) => {
        this.employeeList = this.employeeList.filter((i: any) => {
          if (k.emp_id == i.id && k.title == i.title) {
            i.emailStatus = true
          }
          return i
        })

      })
    })
  }

  backbtn() {
    this.payslipList = true;
    this.payslipTable = false;
    this.employeePayslipContainer = false;
  }

  // get payslip by  employee Sent true or false
  IsCheckedpayslipSent() {
    this.payslipSvc.getPayslipSentData().subscribe((res: any) => {
      this.tempData = res.sentData;
      //   this.tempData.filter((k: any) => {
      //     this.employeeList = this.employeeList.filter((i: any) => {
      //       if (k.emp_id == i.id && k.title == i.title) {
      //         i.emailStatus = true
      //       }
      //       return i
      //     })
      // })
      // console.log(this.employeeList)

    })

  }

  //send email one by one every employee
  async sendEmailPayslip(email: any, title: any, id: number) {
    this.ngxUiLoaderService.start();
      // this.isLoading = true;
    this.emailSvc.sendemailbulks({ email, title, id })
      .subscribe(
        (res: any) => {
          if (res.status === true) {
            this.employeeList = this.employeeList.filter((k: any) => {
              if (id == k.id) {
                k.emailStatus = res.status
                this.ngxUiLoaderService.stop();
              }
              return k
            })
          } else {
            alert('Email not sent');
          }
        },
        (error) => {
          alert('Error sending email: ' + error.message);
        }
      );

  }

  
  


  // async sendEmailPayslip(email: any, title: any, id: number) {
  //   try {
  //     // Set the isLoading property of the specific employee to true
  //     this.employeeList.forEach((emp: any) => {
  //       console.log('ssss',emp);

  //       if (emp.id === id) {
  //         emp.isLoading = true;
  //       }
  //     });

  //     this.emailSvc.sendemailbulks({ email, title, id })
  //       .subscribe(
  //         (res: any) => {
  //           if (res.status === true) {
  //             this.employeeList = this.employeeList.filter((k: any) => {
  //               if (id == k.id) {
  //                 k.emailStatus = res.status
  //                 this.isLoading = false;
  //               }
  //               return k
  //             })

  //           } else {
  //             alert('Email not sent');
  //           }
  //         },
  //         (error) => {
  //           alert('Error sending email: ' + error.message);
  //         }
  //       );
  //   } catch (error) {
  //     // ... your error handling code ...
  //   } finally {
  //     // Reset the isLoading property of the specific employee to false
  //     this.employeeList.forEach((emp: any) => {
  //       if (emp.id === id) {
  //         emp.isLoading = false;
  //       }
  //     });
  //   }
  // }




  //view payslip 
  ShowPayslip(id: number, title: any) {
    this.payslipList = false;
    this.payslipTable = false;
    this.payslipBackBtn = true;
    this.employeePayslipContainer = true;
    // console.log(id, title);
    this.payslipSvc.getByEmployeePayslip(id, title).subscribe((results: any) => {
      this.employeeData = results.employee;
    })
  }


}




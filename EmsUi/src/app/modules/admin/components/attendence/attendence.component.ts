import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EmpAttendanceService } from 'src/app/service/emp-attendance.service';
import * as moment from 'moment';
import { Router } from '@angular/router';
@Component({
  selector: 'app-attendence',
  templateUrl: './attendence.component.html',
  styleUrls: ['./attendence.component.css']
})
export class AttendenceComponent implements OnInit {

  attendenceTable: boolean = false;
  attendenceList: boolean = true;

  currentMonth: any = '';
  currentYear: any = '';
  backMonth: any = '';

  month: string = '';
  year: any = '';
  workingDays: number = 22;
  Employees: any = [];


  total_salary: number = 0;
  total_TDS: number = 0;
  total_PF: number = 0;
  total_net_salary: number = 0;

  read_status: boolean = false;
  btn_disabled: boolean = false;
  // year dropdown
  years: number[] = [];

  constructor(
    private empAttendanceSvc: EmpAttendanceService,
    private fb: FormBuilder,
    private Router:Router
  ) { }

  ngOnInit(): void {
    this.getDate();
    this.getAttendanceSalaryTitle();
  }


  //current date
  getDate() {
    //  this.currentMonth = moment().format("MMMM");
    this.backMonth = moment().subtract(1, 'month').format("MMMM");

    this.currentYear = moment().year();
    //  for month and year dropdown
    let earliestYear = 1990;
    let currentYear = moment().year();
    for (let i = currentYear; i >= earliestYear; i--) {
      this.years.push(i);
    }
  }
  
  months = [
    { name: 'January', value: 'January' },
    { name: 'February', value: 'February' },
    { name: 'March', value: 'March' },
    { name: 'April', value: 'April' },
    { name: 'May', value: 'May' },
    { name: 'June', value: 'June' },
    { name: 'July', value: 'July' },
    { name: 'August', value: 'August' },
    { name: 'September', value: 'September' },
    { name: 'October', value: 'October' },
    { name: 'November', value: 'November' },
    { name: 'December', value: 'December' }
  ];

//on selected month and year 
  onSelected(m: any) {
    this.backMonth=m.value;
  }
  onSelectedYear(y: any) {  
    this.currentYear=y.value;
  }

  //back to list
  backbtn() {
    this.attendenceTable = false;
    this.attendenceList = true;
  }

  //all employees attandance and salary
  // allEmployee() {
  addEmpsSalary() {
    this.attendenceTable = true;
    this.attendenceList = false;

    this.read_status = false;
    this.btn_disabled = false;
    this.empAttendanceSvc.getEmployee().subscribe((results: any) => {

      let allEmpAttandence = results.empdetails.map((e: any) => {
        e.wd = this.workingDays
        e.pl = '0'
        e.sl = '0'
        e.spl = '0'
        e.lwp = '0'
        e.present = this.workingDays
        e.salary = (e.gross_salary / this.workingDays) * this.workingDays
        //e.tds e.pf is constant percentage/amount(its only constant value which get from emp salary table)
        e.TDS = e.tds_amount;
        //e.TDS e.PF is calculate amount (it is exact amount which show in ui table to calculate gross TDS and PF)
        e.PF = e.pf_amount;
        e.net_salary = e.salary - (+e.TDS + +e.PF);

        return e
      })

      this.Employees = allEmpAttandence;

      //sum of gross_salary,tds,pf,net_salary
      let s_salary = 0;
      let s_tds = 0;
      let s_pf = 0;
      let s_net_salary = 0;
      this.Employees.forEach((i: any) => {
        s_salary += i.salary;
        s_tds += +i.TDS;
        s_pf += +i.PF;
        s_net_salary += i.net_salary
      });
      this.total_salary = s_salary;
      this.total_TDS = s_tds;
      this.total_PF = s_pf;
      this.total_net_salary = s_net_salary;
    })
  }

  // calculate Workking Day
  calculateWD(workingDays: number) {
    this.Employees = this.Employees.filter((e: any) => {
      e.wd = workingDays || 0
      e.pl = '0'
      e.sl = '0'
      e.spl = '0'
      e.lwp = '0'
      e.present = workingDays
      e.salary = (e.gross_salary / workingDays) * workingDays || 0
      //e.tds e.pf is constant percentage/amount(its only constant value which get from emp salary table)
      e.TDS = e.tds_amount;
      //e.TDS e.PF is calculate amount (it is exact amount which show in ui table to calculate gross TDS and PF)
      e.PF = e.pf_amount;
      e.net_salary = e.salary - (+e.TDS + +e.PF);

      return e
    })
    //sum of gross_salary,tds,pf,net_salary
    let s_salary = 0;
    let s_tds = 0;
    let s_pf = 0;
    let s_net_salary = 0;
    this.Employees.forEach((i: any) => {
      s_salary += i.salary;
      s_tds += +i.TDS;
      s_pf += +i.PF;
      s_net_salary += i.net_salary
    });
    this.total_salary = s_salary;
    this.total_TDS = s_tds;
    this.total_PF = s_pf;
    this.total_net_salary = s_net_salary;
  }


  // emp input data calculate WD
  calculate(emp: any) {
    const wd = parseInt(emp.wd) || 0;      //working day
    const pl = parseInt(emp.pl) || 0;     //personal leave
    const sl = parseInt(emp.sl) || 0;  //sick leave
    const spl = parseInt(emp.spl) || 0;   //special leave
    const lwp = parseInt(emp.lwp) || 0;  //leave without pay
    emp.present = wd - (pl + sl + spl + lwp) || 0; //total present in a month
    emp.salary = ((emp.gross_salary / this.workingDays) * (wd - lwp)).toFixed(2) || 0;//emp salary
    const empSalary = +emp.salary; //salary
   
    emp.TDS = emp.tds_amount; //emp TDS
    emp.PF = emp.pf_amount;   //emp PF
    const tds = +emp.TDS;  //TDS
    const pf = +emp.PF;   //PF
    
    const deductSalary = tds + pf; //deduction amount   

    emp.net_salary = empSalary - deductSalary;  //emp net_salary

    //sum of gross_salary,tds,pf,net_salary
    let s_salary = 0;
    let s_tds = 0;
    let s_pf = 0;
    let s_net_salary = 0;
    this.Employees.forEach((i: any) => {
      s_salary += +i.salary;
      s_tds += +i.TDS;
      s_pf += +i.PF;
      s_net_salary += i.net_salary;
    });
    this.total_salary = s_salary;
    this.total_TDS = s_tds;
    this.total_PF = s_pf;
    this.total_net_salary = s_net_salary;
  }

  // each employee attendance and their salary and total salary of all employee
  attendanceAndsalarySave() {
    //save in salary_details db
    let eachEmpAttenDtls = this.Employees.map((res: any) => {
      return {
        emp_id: res.id,
        working_days: res.wd,
        pl: res.pl,
        sl: res.sl,
        spl: res.spl,
        lwp: res.lwp,
        present_days: res.present,
        gross_salary: res.salary,//after attendance each emp calculate salary
        total_deduction: +res.TDS + +res.PF,//each emp total deductions
        net_salary: +res.net_salary
      }
    })
    // save in salary db
    const attendance = {
      month: this.backMonth,
      year: this.currentYear,
      working_days: this.workingDays
    }
  // api hit and save  data in database
    this.empAttendanceSvc.saveAttendance(eachEmpAttenDtls, attendance).subscribe((Result: any) => {
      if (Result.status == true) {
        this.attendenceTable = false;
        this.attendenceList = true;
        this.getAttendanceSalaryTitle();
      } else{
        alert('error gen')
      }      
    })
  }


  // get all title from db salary Table
  Title: any = [];

  getAttendanceSalaryTitle() {
    this.empAttendanceSvc.getTitle().subscribe((data: any) => {
      this.Title = data.Title
    })
  }

  // get previous atttendance and salary  through titel(month-year)
  DateTitle: string = "";

  getAttendanceByDate(title: string) {

    this.attendenceTable = true;
    this.attendenceList = false;

    this.read_status = false;
    this.btn_disabled = true;

    this.DateTitle = title;

    this.Title.forEach((e: any) => {

      if (e.title === this.DateTitle) {
        this.backMonth = e.month;
        this.currentYear = e.year;
      }
    })

    this.empAttendanceSvc.getSaveAttendance(this.DateTitle).subscribe((data: any) => {

      this.Employees = data.Results.filter((e: any) => {
        e.wd = e.working_days
        e.pl = e.personal_leave
        e.sl = e.sick_leave
        e.spl = e.special_leave
        e.lwp = e.leavewithoutpay
        e.present = e.present_days
        e.salary = e.gross_salary
        e.TDS = e.tds
        e.PF = e.pf;
        e.net_salary = +e.net_salary

        return e
      })
      let s_salary = 0;
      let s_tds = 0;
      let s_pf = 0;
      let s_net_salary = 0;
      this.Employees.forEach((i: any) => {

        s_salary += +i.salary;
        s_tds += +i.TDS;
        s_pf += +i.PF;
        s_net_salary += i.net_salary
      });
      this.total_salary = s_salary;
      this.total_TDS = s_tds;
      this.total_PF = s_pf;
      this.total_net_salary = s_net_salary;
    })
  }
}






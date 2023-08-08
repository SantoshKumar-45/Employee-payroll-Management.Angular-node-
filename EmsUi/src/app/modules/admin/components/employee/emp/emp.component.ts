import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-emp',
  templateUrl: './emp.component.html',
  styleUrls: ['./emp.component.css']
})
export class EmpComponent implements OnInit {

  employees: any = [];
  modalReference: any;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private empSvc: EmployeeService,
  ) { }

  ngOnInit(): void {
    this.getEmp();
    this.dataRefresh();
  }

  getEmp() {
    this.empSvc.getEmployees().subscribe((result: any) => {
      this.employees = result.employees;
      if (this.empStatus) {
        this.filterEmp;
      } else {
        this.filterEmp = this.employees.filter((data: any) => {
          return data.active === true
        })
      }
    });
  }


  filterEmp: any = [];
  active = "active";
  unactive = "unactive";
  empStatus = "";
  // selectedStyle = "background-color:#DFF2CB"
  getEmpByStatus(status: any) {
    this.empStatus = status;

    //filter
    if (status === this.active) {
      this.filterEmp = this.employees.filter((data: any) => {
        return data.active === true
      })
      // this.selectedStyle = "background-color:#DFF2CB"
      console.log(this.filterEmp);
    } else if (status === this.unactive) {
      this.filterEmp = this.employees.filter((data: any) => {
        return data.active === false
      })
    } else {
      this.filterEmp = this.employees.filter((data: any) => {
        return data
      })

    }
  }


  searchname(input: any) {
    this.filterEmp = this.employees.filter((search: any) => {
      return search.first_name.toLowerCase().indexOf(input) > -1 || search.last_name.toLowerCase().indexOf(input) > -1
    })
   }

  dataRefresh() {
    this.empSvc.getOprt().subscribe(() => {
      this.getEmp();
    })
  }

}


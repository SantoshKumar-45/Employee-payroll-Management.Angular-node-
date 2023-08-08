import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SalaryheadService } from 'src/app/service/salaryhead.service';
import { EmployeeService } from 'src/app/service/employee.service';
import Swal from 'sweetalert2';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-emp-add',
  templateUrl: './emp-add.component.html',
  styleUrls: ['./emp-add.component.css']
})
export class EmpAddComponent implements OnInit {





  employee: FormGroup;

  allSalaryHeads: any = [];

  basic_salary: number = 0;
  gross_salary: number = 0;
  total_deduction: number = 0;
  net_salary: number = 0;

  ExistsEmail: string = "";
  ExistsContactNo: string = "";
  ExistsA_CNo: any = "";
  ExistsPanNo: string = "";


  constructor(
    private empSvc: EmployeeService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router:Router,
    private salaryHeadSvc: SalaryheadService,
  ) {
    this.employee = this.fb.group({
      first_name: ['', [Validators.required, Validators.maxLength(15), Validators.pattern('^[a-zA-Z \s\]+')]],
      last_name: ['', [Validators.required, Validators.maxLength(15), Validators.pattern('^[a-zA-Z \s\]+')]],
      dob: ['', Validators.required],
      // gender:['],
      email: ['', [Validators.required, Validators.email]],
      contact_no: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.maxLength(10), Validators.minLength(10)]],
      address: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9 \.,+/-\]+')]],
      designation: ['', [Validators.required, Validators.maxLength(25), Validators.pattern('^[a-zA-Z \s\]+')]],
      doj: ['', Validators.required],
      account_no: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      bank_name: ['', [Validators.required, Validators.pattern('^[a-zA-Z \s\]+'), Validators.maxLength(35)]],
      branch: ['', [Validators.required, Validators.pattern('^[a-zA-Z \s\]+'), Validators.maxLength(35)]],
      ifsc_code: ['', [Validators.required, Validators.pattern('^[A-Z0-9]*$'), Validators.maxLength(11), Validators.minLength(11)]],
      pan_no: ['', [Validators.required, Validators.pattern('^[A-Z0-9]*$'), Validators.maxLength(10), Validators.minLength(10)]],
    });
  }

  ngOnInit(): void {
    this.getSalaryHead();
  }
  // ifsc code to uppercase
  ifscUpperCase(value: any) {
    this.employee.patchValue({
      ifsc_code: value.toUpperCase()
    });
  }
  // pan no. to uppercase
  panUpperCase(value: any) {
    this.employee.patchValue({
      pan_no: value.toUpperCase()
    });
  }

  // image upload funtion
  selectedFile: any = "";
  pictureValidation: string = "";
  imageSrc: any = "https://w7.pngwing.com/pngs/184/113/png-transparent-user-profile-computer-icons-profile-heroes-black-silhouette-thumbnail.png";

  onFileChanged(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length && event.target.files[0].size <= 51200) {
      console.log(event.target.files[0].size, 'files');
      this.selectedFile = event.target.files[0];
      reader.readAsDataURL(this.selectedFile);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };
    }
    else {
      this.pictureValidation = ' Only Less than 50kb Size are allowed';
      this.imageSrc = "https://w7.pngwing.com/pngs/184/113/png-transparent-user-profile-computer-icons-profile-heroes-black-silhouette-thumbnail.png";
      // console.log('please upload 50kb size');
    }
  }

  //active/Inactive check box function
  status: any = "";
  checkBox: any = "Inactive";
  style: any = "color:red";
  checked: string = ""

  onChecked(event: any) {
    this.status = event.target.checked;
    if (event.target.checked === true) {
      this.checkBox = "active";
      this.style = "color:green";
    } else {
      this.checkBox = "Inactive";
      this.style = "color:red";
    }
  }

  // get data from salary_head and map new arrary
  SalaryHead: any = [];
  getSalaryHead() {
    this.salaryHeadSvc.getSalaryHead().subscribe((s: any) => {
      this.SalaryHead = s.heads.map((i: any) => {
        i.percentage = i.type === '%' ? i.value : 0;
        i.amount = i.type === 'Amount' ? i.value : 0
        return i
      })
    })
  }

  //employee salary calcultion use basic_salary
  calculateByBasic_salary(basic_salary: any) {
    this.SalaryHead = this.SalaryHead.filter((k: any) => {
      k.amount = (k.percentage * basic_salary) / 100 || k.amount;
      return k
    })
    let gross_salary = 0;
    let total_deduction = 0;

    this.SalaryHead.forEach((i: any) => {
      if (i.category === "Earning") {
        gross_salary += i.amount;
      }
      if (i.category === "Deduction") {
        total_deduction += i.amount
      }
    });
    this.gross_salary = +basic_salary + gross_salary;
    this.total_deduction = total_deduction;
    this.net_salary = this.gross_salary - this.total_deduction;
  }


  //employee salary calcultion use array filed
  calculateSalaryAmount(s: any) {
    console.log(s);
   if (s.amount) {
    s.percentage = 0 
   }
    let gross_salary = 0;
    let total_deduction = 0;
    this.SalaryHead.forEach((i: any) => {
      if (i.category === "Earning") {
        gross_salary += +i.amount;
      }
      if (i.category === "Deduction") {
        total_deduction += +i.amount
      }
    });
    this.gross_salary = +this.basic_salary + gross_salary;
    this.total_deduction = total_deduction;
    this.net_salary = this.gross_salary - this.total_deduction;

  }

  calculateSalaryPercentage(s:any){
      if (s.percentage) {
     s.amount = this.basic_salary * s.percentage/100
    } 
     let gross_salary = 0;
     let total_deduction = 0;
     this.SalaryHead.forEach((i: any) => {
       if (i.category === "Earning") {
         gross_salary += +i.amount;
       }
       if (i.category === "Deduction") {
         total_deduction += +i.amount
       }
     });
     this.gross_salary = +this.basic_salary + gross_salary;
     this.total_deduction = total_deduction;
     this.net_salary = this.gross_salary - this.total_deduction;
  }


  // employee all data submit function
  submit() {
    let empSalary: any = {};
    this.SalaryHead.forEach((r: any) => {
      empSalary[r.caption + 'amt'] = r.amount;
      empSalary[r.caption + 'per'] = r.percentage;
    });
    const formData = new FormData();
    // , this.selectedFile.name
    formData.append('file', this.selectedFile);
    formData.append('first_name', this.employee.value?.first_name);
    formData.append('last_name', this.employee.value?.last_name);
    formData.append('dob', this.employee.value?.dob);
    formData.append('email', this.employee.value?.email);
    formData.append('contact_no', this.employee.value?.contact_no);
    formData.append('address', this.employee.value?.address);
    formData.append('designation', this.employee.value?.designation);
    formData.append('doj', this.employee.value?.doj);
    formData.append('active', this.status);
    formData.append('account_no', this.employee.value?.account_no);
    formData.append('bank_name', this.employee.value?.bank_name);
    formData.append('branch', this.employee.value?.branch);
    formData.append('ifsc_code', this.employee.value?.ifsc_code);
    formData.append('pan_no', this.employee.value?.pan_no);
    formData.append('basic_salary', this.basic_salary.toString());
    formData.append('gross_salary', this.gross_salary.toString());
    formData.append('total_deduction', this.total_deduction.toString());
    formData.append('net_salary', this.net_salary.toString());
    formData.append('Salary', JSON.stringify(empSalary));

    // ,salary,this.SalaryHead
    this.empSvc.create(formData).subscribe((result: any) => {
      // console.log(formData.append('first_name', this.employee.value?.first_name))

      if (result.status === true) {
        alert('submit successfully!')
        this.router.navigate(['../employee'], { relativeTo: this.route });
        // this.employee.reset();
      } else {
        alert(result.Message!!)
        this.pictureValidation = result.Message
        this.ExistsEmail = JSON.parse(result.Message).exitsEmail
        this.ExistsContactNo = JSON.parse(result.Message).exitsContact
        this.ExistsA_CNo = JSON.parse(result.Message).exitsA_C
        this.ExistsPanNo = JSON.parse(result.Message).exitsPan
      }
    });
  }

}



import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import * as moment from 'moment';
import { EmployeeService } from 'src/app/service/employee.service';
import { SalaryheadService } from 'src/app/service/salaryhead.service';

@Component({
  selector: 'app-emp-edit',
  templateUrl: './emp-edit.component.html',
  styleUrls: ['./emp-edit.component.css']
})
export class EmpEditComponent implements OnInit {

  employee = this.fb.group({
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
    active: [''],
  });


  //edit by id
  empId: any = "";
  basic_salary: number = 0;
  gross_salary: number = 0;
  total_deduction: number = 0;
  net_salary: number = 0;


  SalaryHead: any = [];
  ExistsEmail: any;
  ExistsContactNo: any;
  ExistsA_CNo: any;
  ExistsPanNo: any;
  pictureValidation: any;


  constructor(
    private empSvc: EmployeeService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private salaryHeadSvc: SalaryheadService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getRouteId();
    this.getSalaryHead();
  }




  // image upload funtion
  selectedFile: any = "";
  imageSrc: any = "";

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
    }
  }

  emp_salary: any = [];

  getRouteId() {
    this.empId = this.route.snapshot.paramMap.get('id');
    console.log(this.empId);
    if (this.empId) {
      this.empSvc.getById(this.empId).subscribe((data: any) => {
        console.log(data);

        this.emp_salary = data.empById

        this.status = data.empById.active;
        this.imageSrc = `http://localhost:5500/api/empProfilePic/${data.empById.picture}`;
        this.basic_salary = data.empById.basic_salary;
        this.gross_salary = data.empById.gross_salary;
        this.total_deduction = data.empById.total_deduction;
        this.net_salary = data.empById.net_salary;


        if (data.empById.active === true) {
          this.checkBox = "active";
          this.style = "color:green";
          this.checked = "true"
        }
        else {
          this.checkBox = "inactive";
          this.style = "color:red";
          this.checked = ""
        }
        this.employee.patchValue({
          first_name: data.empById.first_name,
          last_name: data.empById.last_name,
          dob: moment(data.empById.dob).format("YYYY-MM-DD"),
          email: data.empById.email,
          contact_no: data.empById.contact_no,
          address: data.empById.address,
          designation: data.empById.designation,
          doj: moment(data.empById.doj).format("YYYY-MM-DD"),
          active: data.empById.active,
          account_no: data.empById.account_no,
          bank_name: data.empById.bank_name,
          branch: data.empById.branch,
          ifsc_code: data.empById.ifsc_code,
          pan_no: data.empById.pan_no,
        });
      })
    }
  }


  uploadPic() {
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    this.empSvc.uploadProfilePic(this.empId, formData).subscribe((data: any) => {
      if (data.status == true) {
        alert('Upload successfully')
        this.router.navigate(['.../employee'], { relativeTo: this.route });
      } else {
        alert(data.message);
        this.pictureValidation = data.message;
      }

    })
  }



  status: any = "";
  checkBox: any = "inactive";
  style: any = "color:red";
  checked: string = ""

  onChecked(event: any) {
    this.status = event.target.checked;
    if (event.target.checked === true) {
      this.checkBox = "active";
      this.style = "color:green";
    } else {
      this.checkBox = "inactive";
      this.style = "color:red";
    }
  }

  // get data from salary_head and map new arrary
  getSalaryHead() {
    this.salaryHeadSvc.getSalaryHead().subscribe((s: any) => {

      this.SalaryHead = s.heads.map((i: any) => {

        i.amount = this.emp_salary[`${i.caption.toLowerCase()}_amount`];

        i.percentage = this.emp_salary[`${i.caption.toLowerCase()}_per`];

        return i
      })
    })
  }



  //employee salary calcultion use basic_salary
  calculateByBasic_salary(basic_salary: any) {
    this.SalaryHead = this.SalaryHead.filter((k: any) => {
      k.amount = (this.emp_salary[`${k.caption.toLowerCase()}_per`] * basic_salary) / 100 || this.emp_salary[`${k.caption.toLowerCase()}_amount`];;
      return k
    })

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

    this.gross_salary = +basic_salary + gross_salary;
    this.total_deduction = total_deduction;
    this.net_salary = this.gross_salary - this.total_deduction;

  }

  //employee salary calcultion use array filed
  calculateSalaryPercentage(s: any) {
    console.log(s);
    if (s.percentage) {
      s.amount = this.basic_salary * s.percentage / 100
    }

    let gross_salary = 0;
    let total_deduction = 0;

    this.SalaryHead.forEach((i: any) => {
      console.log('ssssssssss', i.category);

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


  // submit function
  submit() {

    let empSalary: any = {
      basic_salary: +this.basic_salary,
      gross_salary: this.gross_salary,
      total_deduction: this.total_deduction,
      net_salary: this.net_salary
    };

    this.SalaryHead.forEach((r: any) => {
      empSalary[r.caption + 'amt'] = r.amount;
      empSalary[r.caption + 'per'] = r.percentage;
    });


    this.empSvc.update(this.empId, this.employee.value, empSalary).subscribe((result: any) => {
      console.log(result);
      if (result.status === true) {
        alert('submit successfully!');
        this.router.navigate(['../../employee'], { relativeTo: this.route });
      } else {
        alert('result.Message')
        this.pictureValidation = result.Message
        this.ExistsEmail = JSON.parse(result.Message).exitsEmail
        this.ExistsContactNo = JSON.parse(result.Message).exitsContact
        this.ExistsA_CNo = JSON.parse(result.Message).exitsA_C
        this.ExistsPanNo = JSON.parse(result.Message).exitsPan
      }
    });

  }




























}



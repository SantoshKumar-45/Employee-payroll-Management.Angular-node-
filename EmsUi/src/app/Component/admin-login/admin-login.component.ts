import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {


  loginForm = new FormGroup({
    username: new FormControl('',[Validators.required,Validators.minLength(4)]),
    password:new FormControl('',[Validators.required,Validators.minLength(3)]),
  })
 

  constructor(
    private loginSvc: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  Adminlogin() {
    this.loginSvc.Adminlogin(this.loginForm.value).subscribe(
      (result: any) => {
        console.log(result);

        if (result.accessToken) {
          localStorage.setItem("token",result.accessToken);
          localStorage.setItem("id",result.id);
          Swal.fire(result.message);
          this.router.navigate(['/admin']);
        }
      },
      (error: any) => {
        // Handle the error here
        console.error('An error occurred:', error);
        Swal.fire('An error occurred. Please try again later.')
      }
    );
  }

   //Validating for Form Feild 
get username(){
  return this.loginForm.get('username');
}
get password(){
  return this.loginForm.get('password');

}
}

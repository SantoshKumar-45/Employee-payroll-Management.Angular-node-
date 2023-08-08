import { validateVerticalPosition } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangePasswordService } from 'src/app/service/change-password.service';


@Component({
  selector: 'app-change-passowrd',
  templateUrl: './change-passowrd.component.html',
  styleUrls: ['./change-passowrd.component.css']
})
export class ChangePassowrdComponent implements OnInit {

  passwordUpdateForm: any = [];
  passwordVisible: boolean = false;
  status: boolean = false;
  btnUpd: boolean = true;


  constructor(private changePwdSvc: ChangePasswordService,
    private formBuilder: FormBuilder,
    private Router:Router,
    private route:ActivatedRoute) { }


  ngOnInit() {
    this.passwordUpdateForm = this.formBuilder.group({
      oldpassword: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/), Validators.minLength(5), Validators.maxLength(9)]],
      password: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/), Validators.minLength(5), Validators.maxLength(9)]],

      newPassword: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/), Validators.minLength(5), Validators.maxLength(9)]],
    });
  }


  get oldPassword() {
    return this.passwordUpdateForm.get('oldpassword');
  }
  get password() {
    return this.passwordUpdateForm.get('password');
  }
  get newPassword() {
    return this.passwordUpdateForm.get('newPassword');
  }

  //password toggle 
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  // compare password && confirm password
  comparePassword() {
    const password = this.passwordUpdateForm.get('password').value;
    const newPassword = this.passwordUpdateForm.get('newPassword').value;

    if (this.isEmpty(password) && this.isEmpty(newPassword)) {
      this.status = false;
    } else {
      this.status = password === newPassword;
    }
    // this.btnUpd = !this.passwordUpdateForm.valid || !this.status;
  }
  isEmpty(value: string): boolean {
    return value === undefined || value.trim().length === 0;
  }

  updatePassword() {       
    this.changePwdSvc.updatePassword(
      localStorage.getItem('id'),this.passwordUpdateForm.value?.oldpassword , this.passwordUpdateForm.value.newPassword).subscribe((res: any) => {
      alert('Password Updated Succesfully');
      })
  }


}

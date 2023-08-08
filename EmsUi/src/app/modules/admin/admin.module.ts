import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AttendenceComponent } from './components/attendence/attendence.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SalaryheadComponent } from './components/salaryhead/salaryhead.component';
import { SalarySheetComponent } from './components/salary-sheet/salary-sheet.component';
import { EmpComponent } from './components/employee/emp/emp.component';
import { AngularMaterialModule } from 'src/app/angular-matarial';
import { EmpAddComponent } from './components/employee/emp-add/emp-add.component';
import { EmpEditComponent } from './components/employee/emp-edit/emp-edit.component';
import { ChangePassowrdComponent } from './components/change-passowrd/change-passowrd.component';
import { DisbursementReportComponent } from './components/disbursement-report/disbursement-report.component';
import { PayslipComponent } from './components/payslip/payslip.component';
import { CurrencyPipe } from '@angular/common';
import { NumberTowordsPipe } from '../pipe/number-towords.pipe';
import {MatIconModule} from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [

    AttendenceComponent,
    SalaryheadComponent,
    SalarySheetComponent,
    EmpComponent, EmpAddComponent,
    EmpEditComponent,
    ChangePassowrdComponent,
    DisbursementReportComponent,
    PayslipComponent,
    NumberTowordsPipe


  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule, AngularMaterialModule, CurrencyPipe,
    MatIconModule, MatProgressSpinnerModule
  ]
})
export class AdminModule { }

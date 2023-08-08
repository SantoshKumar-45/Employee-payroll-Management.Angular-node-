import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmindashboardComponent } from './components/admindashboard/admindashboard.component';
import { SalaryheadComponent } from './components/salaryhead/salaryhead.component';
import { SalarySheetComponent } from './components/salary-sheet/salary-sheet.component';
import { AttendenceComponent } from './components/attendence/attendence.component';
import { EmpComponent } from './components/employee/emp/emp.component';
import { EmpAddComponent } from './components/employee/emp-add/emp-add.component';
import { EmpEditComponent } from './components/employee/emp-edit/emp-edit.component';
import { ChangePassowrdComponent } from './components/change-passowrd/change-passowrd.component';
import { DisbursementReportComponent } from './components/disbursement-report/disbursement-report.component';
import { PayslipComponent } from './components/payslip/payslip.component';
import { authGuard } from 'src/app/Guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AdmindashboardComponent,
    
    children: [
      { path: 'employee', component: EmpComponent },
      { path: 'empAdd' ,component:EmpAddComponent },
      { path: 'empEdit/:id' ,component:EmpEditComponent },
      { path: 'salaryhead', component: SalaryheadComponent },
      { path: 'payslip', component: PayslipComponent },
      { path: 'salarysheet', component: SalarySheetComponent },
      { path: 'attendence', component: AttendenceComponent },
      {path:'Report', component:DisbursementReportComponent},
      { path: 'change-password', component: ChangePassowrdComponent},
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  }
];






@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

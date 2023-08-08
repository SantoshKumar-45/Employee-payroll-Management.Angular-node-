import { Component, OnInit } from '@angular/core';
import { FormBuilder, } from '@angular/forms';
import { salaryhead } from 'src/app/modules/model/salaryHeadModel';
import { SalaryheadService } from 'src/app/service/salaryhead.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-salaryhead',
  templateUrl: './salaryhead.component.html',
  styleUrls: ['./salaryhead.component.css']
})
export class SalaryheadComponent implements OnInit {

  SalaryHeadForm = new salaryhead();

  headArray: any = []
  empForm: any;
  modalService: any;
  constructor(private headsvc: SalaryheadService,
       
  ) {

  }
  ngOnInit(): void {
    this.getSalaryheads();
  }

  addForms() {
    this.SalaryHeadForm = new salaryhead();
    this.headArray.push(this.SalaryHeadForm);
  }
  removeForms(index: any) {
    alert(index)
    this.headArray.splice(index);
  }

  setSalaryHead() {
    this.headsvc.setSalaryHead(this.headArray)
      .subscribe(response => {
        alert('Data Saved Successfully')
      },
        error => {
          // console.error('Error saving data:', error);
          alert('Error saving data');
        })
   
  }

  //get salary head data 
  salaryHeads: any = this.SalaryHeadForm;
  getSalaryheads() {
    this.headsvc.getSalaryHead().subscribe((res: any) => {
      if (res.heads == '' || 0) {
        this.headArray.push(this.SalaryHeadForm);
      }
      else {
        this.headArray = res.heads;
        this.headsvc.headRefresh();
      }
    })
  }


}




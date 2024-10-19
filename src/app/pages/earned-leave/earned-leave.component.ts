import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MasterService } from '../../services/master.service';
import { EarnLeave, employee, IApiResponse } from '../../model/master';
import { Observable } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-earned-leave',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe,DatePipe],
  templateUrl: './earned-leave.component.html',
  styleUrl: './earned-leave.component.css'
})
export class EarnedLeaveComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  masterSrc = inject(MasterService);
  employee$: Observable<employee[]> = new Observable<employee[]>();

  earnLeaveList = signal<EarnLeave[]>([]);

  ngOnInit(): void {
    this.getEarnLeave();
  }
  constructor() {
    this.initializeform();
    this.employee$ = this.masterSrc.getAllEmployees();
   
  }

  initializeform() {
    this.form = new FormGroup({
      earnedLeaveId: new FormControl(0),
      employeeId: new FormControl(this.masterSrc.loggesUserData.employeeId),
      totalEarnedLeaves: new FormControl(0),
      totalSickEarnedLeaves: new FormControl(0),
      lastUpdatedDate: new FormControl(new Date()),
    })
  }
  onSave() {
    debugger
    const form = this.form.value;
    this.masterSrc.addEarnedLeave(form).subscribe((res: IApiResponse) => {
      if (res.result) {
        alert("Leaves modiified");
      }
    })
  }

  getEarnLeave() {
    this.masterSrc.getAllEarnedLeaves().subscribe((res: IApiResponse) => {
      this.earnLeaveList.set(res.data);
    })
  }
}

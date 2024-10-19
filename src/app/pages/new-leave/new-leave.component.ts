import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MasterService } from '../../services/master.service';
import { employee, IApiResponse, LeaveRequest } from '../../model/master';
import { Observable } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-new-leave',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe, DatePipe],
  templateUrl: './new-leave.component.html',
  styleUrl: './new-leave.component.css'
})
export class NewLeaveComponent implements OnInit {


  leaveForm: FormGroup = new FormGroup({});
  masterSrc = inject(MasterService);
  leaveTypeList = signal<LeaveRequest[]>([]);
  employee$: Observable<employee[]> = new Observable<employee[]>();
  requestType = signal<LeaveRequest[]>([]);

  constructor() {
    this.initializedForm();
  }
  ngOnInit(): void {
    this.getLeaveTypes();
    this.employee$ = this.masterSrc.getAllEmployees();
    if (this.masterSrc.loggesUserData.role == 'Employee') {
      this.getData();
    } else {
      this.getAllLeaveRequest();
    }
  }


  getData() {
    this.masterSrc.getAllLeaveRequestByEmpId(this.masterSrc.loggesUserData.employeeId).subscribe((res: IApiResponse) => {
      this.requestType.set(res.data);
    })
  }
  getAllLeaveRequest() {
    this.masterSrc.getAllLeaveRequest().subscribe((res: IApiResponse) => {
      this.requestType.set(res.data);
    })
  }
  initializedForm() {
    this.leaveForm = new FormGroup({
      leaveId: new FormControl(0),
      employeeId: new FormControl(this.masterSrc.loggesUserData.employeeId),
      leaveTypeId: new FormControl(0),
      startDate: new FormControl(""),
      endDate: new FormControl(""),
      status: new FormControl("New"),
      reason: new FormControl(''),
      requestDate: new FormControl(new Date()),
    })
    if (this.masterSrc.loggesUserData.role == 'Employee') {
      this.leaveForm.controls['employeeId'].disable();
    };
  }

  getLeaveTypes() {
    this.masterSrc.getLeaveTypes().subscribe((res: IApiResponse) => {
      this.leaveTypeList.set(res.data);
    });
  }

  onSave() {
    debugger
    const formvalue = this.leaveForm.getRawValue();
    this.masterSrc.createNewLeaveRequest(formvalue).subscribe(() => {
      alert("saved");
      this.getAllLeaveRequest() ;
    })
  }

  onApprove(leaveId: number) {
debugger
    this.masterSrc.changeLeaveStatus(leaveId, 'Approved').subscribe((res: IApiResponse) => {
      this.leaveTypeList.set(res.data);
      this.getAllLeaveRequest() ;
    })
  }
}

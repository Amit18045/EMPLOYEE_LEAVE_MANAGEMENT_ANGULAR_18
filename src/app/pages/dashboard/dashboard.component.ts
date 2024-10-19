import { Component, inject, OnInit, signal } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { EmployeeList } from '../../model/master';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  masterSrc=inject(MasterService);
  totalEmployees :number=0;
  TotalLeave :number=0;
  NewLeaves :number=0;
  ApprovedLeaves :number=0;
  CanceledLeaves:number=0;
ngOnInit(): void {
  this.getHRDashboard();
}
getHRDashboard(){
  debugger
  this.masterSrc.getHRDashboard().subscribe((res:EmployeeList)=>{
this.totalEmployees=res.totalEmployee;
this.TotalLeave=res.totalLeaves;
this.NewLeaves=res.totalNewLeaves;
this.ApprovedLeaves=res.totalApprovedLeaves;
this.CanceledLeaves=res.totalCanceledLeave;
  })
}

}

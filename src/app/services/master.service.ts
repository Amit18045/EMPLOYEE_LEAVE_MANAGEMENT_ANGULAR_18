import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { EarnLeave, employee, EmployeeList, IApiResponse, LeaveRequest } from '../model/master';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  https = inject(HttpClient);
  API_KEY = environment.API_KEY;
  loggesUserData:any;
  constructor(){
    const localData=localStorage.getItem("leaveUser");
    if(localData!=null){
     this.loggesUserData=JSON.parse(localData);
    }
  }


  getParentDepartment(): Observable<IApiResponse> {
    return this.https.get<IApiResponse>(`${this.API_KEY}GetParentDepartment`);
  }

  getChildDepartment(parentId: number): Observable<IApiResponse> {
    return this.https.get<IApiResponse>(`${this.API_KEY}GetChildDepartmentByParentId?deptId=${parentId}`);
  }

  createEmployee(empObj: any) {
    debugger
    return this.https.post(`${this.API_KEY}CreateEmployee`, empObj);
  }
  getAllEmployees(): Observable<employee[]> {
    return this.https.get<employee[]>(`${this.API_KEY}GetAllEmployees`);
  }

  getAllChildDepartment(): Observable<IApiResponse> {
    return this.https.get<IApiResponse>(`${this.API_KEY}GetAllChildDepartment`);
  }
  deleteEmp(empID: number) {
    return this.https.delete(`${this.API_KEY}DeleteEmployee/${empID}`)
  }

  UpdateEmployee(empObj: any) {
    return this.https.put(`${this.API_KEY}UpdateEmployee/${empObj.employeeId}`, empObj)
  }

  addEarnedLeave(empObj: EarnLeave): Observable<IApiResponse> {
    return this.https.post<IApiResponse>(`${this.API_KEY}AddNewEarnedLeave`, empObj)
  }
  getAllEarnedLeaves(): Observable<IApiResponse> {
    return this.https.get<IApiResponse>(`${this.API_KEY}GetAllEarnedLeaves`);
  }


  getLeaveTypes(): Observable<IApiResponse> {
    return this.https.get<IApiResponse>(`${this.API_KEY}GetLeaveTypes`);
  }
  
  createNewLeaveRequest(empObj:LeaveRequest):Observable<LeaveRequest>{
    return this.https.post<LeaveRequest>(`${this.API_KEY}CreateNewLeaveRequest`, empObj)
  }


  getAllLeaveRequestByEmpId(empId:number): Observable<IApiResponse> {
    return this.https.get<IApiResponse>(`${this.API_KEY}GetAllLeaveRequestByEmpId?id=${empId}`);
  }

  
  getAllLeaveRequest(): Observable<IApiResponse> {
    return this.https.get<IApiResponse>(`${this.API_KEY}GetAllLeaveRequest`);
  }

  changeLeaveStatus(leaveId:number,status:string): Observable<IApiResponse> {
    return this.https.get<IApiResponse>(`${this.API_KEY}ChangeLeaveStatus?leaveId=${leaveId}&status=${status}`);
  }

  getHRDashboard(): Observable<EmployeeList> {
    return this.https.get<EmployeeList>(`${this.API_KEY}GetHRDashboard`);
  }

}

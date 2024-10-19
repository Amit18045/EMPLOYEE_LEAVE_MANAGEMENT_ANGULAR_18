export class employee {
    employeeId: number;
    employeeName: string;
    contactNo: string;
    emailId: string;
    deptId: number;
    password: string;
    gender: string;
    role: string;
    createdDate: Date;
    constructor(){
        this.emailId='',
        this.employeeId=0,
        this.employeeName='',
        this.contactNo='',
        this.deptId=0,
        this.password='';
        this.gender='',
        this.role='',
        this.createdDate=new Date
    }
  }

  export interface ParentDept {
    departmentId: number;
    departmentName: string;
    departmentLogo: string;
  }
  export interface ChildDept {
    childDeptId: number;
    parentDeptId: number;
    departmentName: string;
  }
 
  
  export interface IApiResponse {
    message: string;
    result: boolean;
    data: any;
  }

  export interface LeaveRequest {
    leaveId: number;
    employeeId: number;
    leaveTypeId: number;
    startDate: string;
    endDate: string;
    status: string;
    reason: string;
    requestDate: string;
    employeeName: string;
    contactNo: string;
    typeName: string;
  }

  export interface EarnLeave {
    earnedLeaveId: number;
    employeeId: number;
    totalEarnedLeaves: number;
    totalSickEarnedLeaves: number;
    lastUpdatedDate: string;
    employeeName: string;
  }

  export interface LeaveType {
    leaveTypeId: number;
    typeName: string;
  }
  export interface EmployeeList {
    totalEmployee: number;
    totalLeaves: number;
    totalNewLeaves: number;
    totalApprovedLeaves: number;
    totalCanceledLeave: number;
  }
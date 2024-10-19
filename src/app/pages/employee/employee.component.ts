import { Component, inject, OnInit, signal } from '@angular/core';
import { ChildDept, employee, IApiResponse, ParentDept } from '../../model/master';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MasterService } from '../../services/master.service';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {

  masterSrc = inject(MasterService);
  parentId: string = '';
  parentDeptList = signal<ParentDept[]>([]);
  childDeptList = signal<ChildDept[]>([]);
  employeeList=signal<employee[]>([]);

  employeeObj: FormGroup = new FormGroup({
    employeeId: new FormControl(0),
    employeeName: new FormControl(''),
    contactNo: new FormControl(''),
    emailId: new FormControl(''),
    deptId: new FormControl(0),
    password: new FormControl(''),
    gender: new FormControl(''),
    role: new FormControl('employee'),
    createdDate: new FormControl(new Date),
    parentId:new FormControl(0)
  })

  ngOnInit(): void {
    this.loadParent()
    this.getAllEmployees();
  }

  loadParent() {
    this.masterSrc.getParentDepartment().subscribe((res: IApiResponse) => {
      this.parentDeptList.set(res.data)  ;
    })
  }

  onDeptChange(){
    debugger
    this.masterSrc.getChildDepartment(this.employeeObj.get('parentId')?.value).subscribe((res:IApiResponse)=>{
this.childDeptList.set(res.data);
    })
  }

  getAllEmployees(){
    this.masterSrc.getAllEmployees().subscribe((res:any)=>{
this.employeeList.set(res);
    })
  }

  getAllChildDepartment(){
    this.masterSrc.getAllChildDepartment().subscribe((res:any)=>{
    this.childDeptList.set(res);
    })
  }
  onSave() {
    debugger
    const form = this.employeeObj.value;
    this.masterSrc.createEmployee(form).subscribe((res:any)=>{
   
        alert("Employee Created Sucessfully");
       this.getAllEmployees();
    })
  }
  onDelete(empId:number){
    debugger
    const isDelete=confirm("Are you sure to want to delete this");
    if(isDelete){
      this.masterSrc.deleteEmp(empId).subscribe(()=>{
        alert("delete successfully");
        this.getAllEmployees();
      })
    }
   
  }

  onEdit(item: any): void {
    debugger
    // Use patchValue to set form values based on item
    this.employeeObj.patchValue({
      employeeId: item.employeeId,
      employeeName: item.employeeName,
      contactNo: item.contactNo,
      emailId: item.emailId,
      deptId: item.deptId,
      password: item.password,
      gender: item.gender,
      role: item.role,
      createdDate: item.createdDate
    });
    this.getAllChildDepartment();
  }
  update(){
    debugger
    this.masterSrc.UpdateEmployee(this.employeeObj.value).subscribe(()=>{
      alert("update employee");
      this.getAllEmployees();
    })
  }
}

import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  loginSrc=inject(LoginService);
  route=inject(Router);
  loginObj:any={
    "userName": "",
    "password": ""
  }
  onlogin(){
    this.loginSrc.login(this.loginObj).subscribe((res:any)=>{
      if(res.result){
        localStorage.setItem("leaveUser",JSON.stringify(res.data) );
        this.route.navigateByUrl("dashboard");
      }
    })
  }

}

import { HttpClient } from '@angular/common/http';
import { inject, Inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

 https=inject(HttpClient);
 API_KEY=environment.API_KEY;

login(loginObj:any){
  return this.https.post(`${this.API_KEY}login`,loginObj);
}

}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstantService } from './constant.service';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public http: HttpService) { }

  userRegister(body): Observable<any> {
    return this.http.post(ConstantService.api.userRegister, body);
  }

  userLogin(body): Observable<any> {
    return this.http.post(ConstantService.api.userLogin, body);
  }
}

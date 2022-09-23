import { Injectable } from '@angular/core';
import { IUserRegister } from '../interfaces/user-register';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiDataBindService {

  constructor(private authSvc: AuthService) { }

  userRegister(userData: IUserRegister){
    let promise = new Promise < any > ((resolve, reject) => {
    let body = {
      "nombre": userData.fullname,
      "login": userData.fullname,
      "contrasena": userData.password,
      "email": userData.emailAddress
    }
    this.authSvc.userRegister(body).subscribe(res => {
        resolve(res)
      }, (err) => {
        console.log(err)
        reject(err);
      });
    });
    return promise
  }
}

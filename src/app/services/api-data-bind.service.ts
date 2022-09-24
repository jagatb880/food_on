import { Injectable } from '@angular/core';
import { IUserRegister } from '../interfaces/user-register';
import { AuthService } from './auth.service';
import { Preferences } from '@capacitor/preferences';
import { ConstantService } from './constant.service';
import { ILoginData } from '../interfaces/login-data';

@Injectable({
  providedIn: 'root'
})
export class ApiDataBindService {

  constructor(private authSvc: AuthService) { }

  getUserInfo(){
    let promise = new Promise < any > (async (resolve, reject) => {
      await Preferences.get({ key: ConstantService.dbKey.userID }).then(userID=>{
        if(userID != null){
          resolve(userID.value);
        }else{
          resolve(null);
        }
      }).catch(error=>{
        reject(error);
      })
    });
    return promise;
  }

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

  loginData(userLogin: ILoginData){
    let promise = new Promise < any > ((resolve, reject) => {
    let usuariologin = {
      "login": userLogin.login,
      "password": userLogin.password,
    }
    let body = {usuariologin};
    this.authSvc.userLogin(body).subscribe(res => {
        resolve(res)
      }, (err) => {
        console.log(err)
        reject(err);
      });
    });
    return promise
  }
}

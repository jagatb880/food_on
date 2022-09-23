import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUserRegister } from 'src/app/interfaces/user-register';
import { ApiDataBindService } from 'src/app/services/api-data-bind.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  userRegister: IUserRegister;
  constructor(private router: Router, private _location: Location, private toastSvc: ToastService,
    private apiDataBindSvc: ApiDataBindService) { }

  ngOnInit() {
    this.userRegister = {
      fullname: "",
      contactNumber: "",
      emailAddress: "",
      password: "",
    }
  }

  register() {
    if(this.userRegister.fullname == ""){
      this.toastSvc.show({
            message: "Enter your Full name",
            type: "error",
          });
    }else if(this.userRegister.contactNumber == ""){
      this.toastSvc.show({
        message: "Enter your Contact Number",
        type: "error",
      });
    }else if(this.userRegister.emailAddress == ""){
      this.toastSvc.show({
        message: "Enter your Full Email Address",
        type: "error",
      });
    }else if(this.userRegister.password == ""){
      this.toastSvc.show({
        message: "Enter a Password",
        type: "error",
      });
    }else{
      this.apiDataBindSvc.userRegister(this.userRegister).then(data=>{
        console.log(data);
        // this.router.navigate(['home'], {replaceUrl: true});
      });
    }
   
  }

  goToBack() {
    this._location.back();
  }


}

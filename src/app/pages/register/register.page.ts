import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { IUserRegister } from 'src/app/interfaces/user-register';
import { ApiDataBindService } from 'src/app/services/api-data-bind.service';
import { ConstantService } from 'src/app/services/constant.service';
import { NetworkConnectivityService } from 'src/app/services/network-connectivity.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  userRegister: IUserRegister;
  constructor(
    private router: Router,
    private _location: Location,
    private toastSvc: ToastService,
    private apiDataBindSvc: ApiDataBindService,
    private networkSvc: NetworkConnectivityService,
    private storage: Storage
  ) {}

  ngOnInit() {
    this.userRegister = {
      fullname: '',
      contactNumber: '',
      emailAddress: '',
      password: '',
    };
  }

  register() {
    if (this.networkSvc.status) {
      if (this.userRegister.fullname == '') {
        this.toastSvc.show({
          message: 'Enter your Full name',
          type: 'error',
        });
      } else if (this.userRegister.contactNumber == '') {
        this.toastSvc.show({
          message: 'Enter your Contact Number',
          type: 'error',
        });
      } else if (this.userRegister.emailAddress == '') {
        this.toastSvc.show({
          message: 'Enter your Full Email Address',
          type: 'error',
        });
      } else if (!this.validateEmail(this.userRegister.emailAddress)) {
        this.toastSvc.show({
          message: 'Enter a valid email address',
          type: 'error',
        });
      } else if (this.userRegister.password == '') {
        this.toastSvc.show({
          message: 'Enter a Password',
          type: 'error',
        });
      } else {
        this.apiDataBindSvc
          .userRegister(this.userRegister)
          .then(async (data) => {
            console.log(data);
            if (data.status == 200) {
              console.log(data.data.id);
              await this.storage.set(
                ConstantService.dbKey.userID,
                data.data.id
              );
              await this.router.navigate(['home'], { replaceUrl: true });
            } else {
              this.toastSvc.show({
                message: data.message,
                type: 'error',
              });
            }
          })
          .catch((error) => {
            this.toastSvc.show({
              message: error,
              type: 'error',
            });
          });
      }
    } else {
      this.toastSvc.show({
        message: ConstantService.message.noInternetConnection,
        type: 'error',
      });
    }
  }

  validateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false;
  }

  goToBack() {
    this._location.back();
  }

  goToLogin() {
    this.router.navigate(['login']);
  }
}

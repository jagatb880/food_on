import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { ILoginData } from 'src/app/interfaces/login-data';
import { ApiDataBindService } from 'src/app/services/api-data-bind.service';
import { ConstantService } from 'src/app/services/constant.service';
import { NetworkConnectivityService } from 'src/app/services/network-connectivity.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginData: ILoginData;
  constructor(
    private router: Router,
    private _location: Location,
    private toastSvc: ToastService,
    private storage: Storage,
    private apiDataBindSvc: ApiDataBindService,
    private networkSvc: NetworkConnectivityService
  ) {}

  ngOnInit() {
    this.loginData = {
      login: '',
      password: '',
    };
  }

  login() {
    if (this.networkSvc.status) {
      if (this.loginData.login == '') {
        this.toastSvc.show({
          message: 'Enter your Username',
          type: 'error',
        });
      } else if (this.loginData.password == '') {
        this.toastSvc.show({
          message: 'Enter your Password',
          type: 'error',
        });
      } else {
        this.apiDataBindSvc
          .loginData(this.loginData)
          .then(async (data) => {
            console.log(data);
            if (data.status == 200) {
              await this.storage.set(
                ConstantService.dbKey.userID,
                data.data[0].id_usuario
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
              message: ConstantService.message.wentWrong,
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

  goToBack() {
    this._location.back();
  }
}

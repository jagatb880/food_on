import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiDataBindService } from 'src/app/services/api-data-bind.service';
import { ConstantService } from 'src/app/services/constant.service';
import { NetworkConnectivityService } from 'src/app/services/network-connectivity.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  constructor(
    private _location: Location,
    private apiDataBind: ApiDataBindService,
    private toastSvc: ToastService,
    private networkSvc: NetworkConnectivityService
  ) {}

  email: any;
  ngOnInit() {
    this.email = '';
  }

  reset() {
    if (this.networkSvc.status) {
      if (this.email == '') {
        this.toastSvc.show({
          message: 'Enter your email',
          type: 'error',
        });
      } else if (!this.validateEmail(this.email)) {
        this.toastSvc.show({
          message: 'Enter a valid email address',
          type: 'error',
        });
      } else {
        this.apiDataBind
          .forgotpass(this.email)
          .then((data) => {
            if (data.status == 200) {
              this.toastSvc.show({
                message: 'Check your mail for reset link.',
                type: 'success',
              });
              this._location.back();
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
    }
  }

  goToBack() {
    this._location.back();
  }

  validateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false;
  }
}

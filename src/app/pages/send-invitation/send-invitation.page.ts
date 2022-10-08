import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiDataBindService } from 'src/app/services/api-data-bind.service';
import { ConstantService } from 'src/app/services/constant.service';
import { NetworkConnectivityService } from 'src/app/services/network-connectivity.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-send-invitation',
  templateUrl: './send-invitation.page.html',
  styleUrls: ['./send-invitation.page.scss'],
})
export class SendInvitationPage implements OnInit {
  email: any;
  constructor(
    private _location: Location,
    private networkSvc: NetworkConnectivityService,
    private toastSvc: ToastService,
    private apiDataBinding: ApiDataBindService
  ) {}

  ngOnInit() {
    this.email = '';
  }

  sendInvitation() {
    if (this.networkSvc.status) {
      if (this.email == '') {
        this.toastSvc.show({
          message: 'Enter email address',
          type: 'error',
        });
      } else if (!this.validateEmail(this.email)) {
        this.toastSvc.show({
          message: 'Enter a valid email address',
          type: 'error',
        });
      } else {
        this.apiDataBinding
          .usrGetUsuarioByEmail(this.email)
          .then((data) => {
            if (data.status == 200) {
              this.toastSvc.show({
                message: 'Successfully send the invitation to the email.',
                type: 'success',
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

  validateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false;
  }
}

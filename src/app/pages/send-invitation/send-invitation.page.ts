import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiDataBindService } from 'src/app/services/api-data-bind.service';
import { ConstantService } from 'src/app/services/constant.service';
import { NetworkConnectivityService } from 'src/app/services/network-connectivity.service';
import { SharedService } from 'src/app/services/shared.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-send-invitation',
  templateUrl: './send-invitation.page.html',
  styleUrls: ['./send-invitation.page.scss'],
})
export class SendInvitationPage implements OnInit {
  email: string;
  constructor(
    private _location: Location,
    private networkSvc: NetworkConnectivityService,
    private toastSvc: ToastService,
    private sharedSvc: SharedService,
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
      } else if (!this.validateEmail(this.email.trim())) {
        this.toastSvc.show({
          message: 'Enter a valid email address',
          type: 'error',
        });
      } else {
        this.sharedSvc.showLoader();
        this.apiDataBinding
          .usrGetUsuarioByEmail(this.email.trim())
          .then((data) => {
            this.sharedSvc.dismissLoader();
            if (data.status == 200) {
              this.sentInvite(data.data[0].id);
            }
          })
          .catch((error) => {
            this.sharedSvc.dismissLoader();
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

  sentInvite(id) {
    let params = {
      idUserWhoInvites: this.sharedSvc.userId,
      idUserToInvite: id,
    };
    let body = { params };
    this.apiDataBinding
      .sentInvitation(body)
      .then((data) => {
        if (data.status == 200 && data.data != null) {
          this.toastSvc.show({
            message: data.message,
            type: 'success',
          });
        } else if (data.status == 200 && data.data == null) {
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

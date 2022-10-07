import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiDataBindService } from 'src/app/services/api-data-bind.service';
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
    private toastSvc: ToastService,
    private apiDataBinding: ApiDataBindService
  ) {}

  ngOnInit() {
    this.email = '';
  }

  sendInvitation() {
    if (this.email == '') {
      this.toastSvc.show({
        message: 'Please enter the email address',
        type: 'error',
      });
    } else if (!this.validateEmail(this.email)) {
      this.toastSvc.show({
        message: 'You have entered an invalid email address!',
        type: 'error',
      });
    } else {
      this.apiDataBinding.getUsrGetUsuarioByEmail(this.email).then((data) => {
        if (data.status == 200) {
          console.log(data.data);
          this.toastSvc.show({
            message: 'Successfully sent the invitation.',
            type: 'success',
          });
        }
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
}

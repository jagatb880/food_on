import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-send-invitation',
  templateUrl: './send-invitation.page.html',
  styleUrls: ['./send-invitation.page.scss'],
})
export class SendInvitationPage implements OnInit {

  constructor(private _location: Location) { }

  ngOnInit() {
  }

  goToBack() {
    this._location.back();
  }

}

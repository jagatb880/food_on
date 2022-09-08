import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router, private _location: Location) { }

  ngOnInit() {
  }

  login() {
    this.router.navigate(['home']);
  }

  goToBack() {
    this._location.back();
  }

}

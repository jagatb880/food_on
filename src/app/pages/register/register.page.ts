import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private router: Router, private _location: Location) { }

  ngOnInit() {
  }

  register() {
    this.router.navigate(['home']);
  }

  goToBack() {
    this._location.back();
  }


}

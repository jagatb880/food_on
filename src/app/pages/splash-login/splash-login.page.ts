import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash-login',
  templateUrl: './splash-login.page.html',
  styleUrls: ['./splash-login.page.scss'],
})
export class SplashLoginPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToLogin() {
    this.router.navigate(['/login'])
  }

  goToRegister() {
    this.router.navigate(['/register'])
  }

}

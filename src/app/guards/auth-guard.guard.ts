import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiDataBindService } from '../services/api-data-bind.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private router: Router, private apiDataBind: ApiDataBindService) {}
  async canActivate() {
    let user: any = await this.apiDataBind.getUserInfo();
    if (user == null) {
      return await this.router.parseUrl("/splash-login");
    } else {
      return true;
    }
  }
  
}

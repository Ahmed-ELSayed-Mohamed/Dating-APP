import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../Services/account.service';
import { map } from 'rxjs/operators';
import { User } from '../Models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private accountservic: AccountService,
    private toast: ToastrService
  ) {}
  canActivate(): Observable<boolean> {
    return this.accountservic.currentuser$.pipe(
      map((user) => {
        if (user) return true;
        this.toast.error('You shall not pass');
        return false;
      })
    );
  }
}

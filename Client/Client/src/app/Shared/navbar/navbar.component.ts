import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { User } from 'src/app/Models/User';
import { AccountService } from 'src/app/Services/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  model = {
    userName: '',
    Password: '',
  };
  isLogin = false;
  curresntuser$: Observable<User>;
  constructor(
    private accountservice: AccountService,
    private router: Router,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.curresntuser$ = this.accountservice.currentuser$;
  }
  login() {
    this.accountservice.login(this.model).subscribe(
      (response) => {
        // console.log(response);
        this.router.navigateByUrl('/members');
      },
      (error) => {
        this.toast.error(error.error);
      }
    );
  }
  logOut() {
    this.isLogin = false;
    this.accountservice.logout();
    this.router.navigateByUrl('/');
  }
}

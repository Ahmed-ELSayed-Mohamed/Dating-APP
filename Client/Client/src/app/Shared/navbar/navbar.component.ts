import { Component, OnInit } from '@angular/core';
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
  constructor(private accountservice: AccountService) {}

  ngOnInit(): void {
    this.curresntuser$ = this.accountservice.currentuser$;
  }
  login() {
    this.accountservice.login(this.model).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  logOut() {
    this.isLogin = false;
    this.accountservice.logout();
  }
}

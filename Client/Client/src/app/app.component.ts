import { AccountService } from 'src/app/Services/account.service';
import { User } from './Models/User';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Client';
  users: any;

  constructor(
    private http: HttpClient,
    private accountservie: AccountService
  ) {}
  ngOnInit(): void {
    this.setCurrentuser();
  }
  setCurrentuser() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.accountservie.setCurrentUser(user);
  }
}

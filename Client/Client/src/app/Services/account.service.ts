import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../Models/User';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl = 'https://localhost:5001/api/account/';
  constructor(private http: HttpClient) {}
  private currentusersource = new ReplaySubject<User>(1);
  currentuser$ = this.currentusersource.asObservable();
  login(model: any) {
    return this.http.post<User>(this.baseUrl + 'login', model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentusersource.next(user);
        }
      })
    );
  }
  setCurrentUser(user: User) {
    this.currentusersource.next(user);
  }
  logout() {
    localStorage.removeItem('user');
    this.currentusersource.next(null);
  }
  register(model: any) {
    return this.http.post<User>(this.baseUrl + 'register', model);
  }
}

import { AccountService } from 'src/app/Services/account.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { User } from '../Models/User';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  @Input() removecom: boolean;
  model: any = {};

  constructor(
    private accountservice: AccountService,
    private toast: ToastrService
  ) {}

  ngOnInit() {}

  register() {
    this.removecom = false;
    this.accountservice.register(this.model).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        this.toast.error(error.error);
      }
    );
  }

  cancel() {
    this.cancelRegister.emit(false);
    console.log('cancelled');
  }
}

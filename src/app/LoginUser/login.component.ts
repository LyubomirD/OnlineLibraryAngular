import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import {UserLoginService} from './loginService/userLogin.component';
import {UserLoginRequest} from './loginRequest/userLoginRequest';

@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class UserLoginComponent implements OnInit {
  login: UserLoginRequest = {email: '', password: ''};
  constructor(private loginService: UserLoginService) {
  }

  ngOnInit(): void {
  }

  onLogin(loginForm: NgForm): void {
    const formData: UserLoginRequest = {
      email: loginForm.value.email,
      password: loginForm.value.password,
    };

    this.loginService.userLogin(formData).subscribe(
      () => {
        console.log('User registration success!');
        loginForm.reset();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        alert(error.message);
      }
    );
  }

}

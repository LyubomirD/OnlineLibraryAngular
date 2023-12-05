import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './authLoginService/authService.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private authService: AuthService) { }

  onLogin(loginForm: NgForm): void {
    const { username, password } = loginForm.value;
    this.authService.login(username, password).subscribe(
      () => {
        console.log('Login successful');

        // Optionally, navigate to a new page or perform other actions
      },
      error => {
        console.error('Login failed', error);
      }
    );
  }
}

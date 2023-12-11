import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from './authLoginService/authService.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {
  }

  onLogin(loginForm: NgForm): void {
    const {username, password} = loginForm.value;
    this.authService.login(username, password).subscribe(
      () => {
        console.log('Login successful');

        this.router.navigate(['/online-library']).then(r => null);
      },
      error => {
        console.error('Login failed', error);
      }
    );
  }
}

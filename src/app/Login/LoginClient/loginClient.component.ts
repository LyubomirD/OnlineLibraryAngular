import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from './authLoginService/authClientService.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './loginClient.component.html',
  styleUrls: ['./loginClient.component.css']
})
export class LoginClientComponent {
  constructor(private authService: AuthService, private router: Router) {
  }

  onLogin(loginForm: NgForm): void {
    const {username, password} = loginForm.value;
    this.authService.login(username, password).subscribe(
      () => {
        console.log('Login successful');

        this.router.navigate(['/online-library-client']).then(r => null);
      },
      error => {
        console.error('Login failed', error);
      }
    );
  }
}

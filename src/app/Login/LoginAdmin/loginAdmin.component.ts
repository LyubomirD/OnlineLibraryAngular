import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from './authLoginService/authAdminService.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './loginAdmin.component.html',
  styleUrls: ['./loginAdmin.component.css']
})
export class LoginAdminComponent {
  constructor(private authService: AuthService, private router: Router) {
  }

  onLogin(loginForm: NgForm): void {
    const {username, password} = loginForm.value;
    this.authService.login(username, password).subscribe(
      () => {
        console.log('Login successful');

        this.router.navigate(['/online-library-admin']).then(r => null);
      },
      error => {
        console.error('Login failed', error);
      }
    );
  }
}

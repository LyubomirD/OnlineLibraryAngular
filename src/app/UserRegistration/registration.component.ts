import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import {UserRegistrationService} from './registrationService/userRegistration.component';
import {UserRequest} from './registrationRequest/userRequest';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  user: UserRequest = {firstName: '', lastName: '', email: '', password: ''};

  constructor(private registrationService: UserRegistrationService, private router: Router) {
  }

  ngOnInit(): void {
  }

  onSubmit(registrationForm: NgForm): void {
    const formData: UserRequest = {
      firstName: registrationForm.value.firstName,
      lastName: registrationForm.value.lastName,
      email: registrationForm.value.email,
      password: registrationForm.value.password,
    };

    this.registrationService.registrationAdministrator(formData).subscribe(
      () => {
        console.log('User registration success!');
        this.router.navigate(['/login']).then(r => null);
        registrationForm.reset();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        alert(error.message);
      }
    );
  }

}

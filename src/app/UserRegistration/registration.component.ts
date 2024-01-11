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
  selectedRole: string = null; // 'admin' or 'client'
  constructor(private registrationService: UserRegistrationService, private router: Router) {
  }

  ngOnInit(): void {
  }

  onSubmit(registrationForm: NgForm): void {
    if (!this.selectedRole) {
      alert('Please select a role (Administrator or Client)');
      return;
    }

    const formData: UserRequest = {
      firstName: registrationForm.value.firstName,
      lastName: registrationForm.value.lastName,
      email: registrationForm.value.email,
      password: registrationForm.value.password,
    };

    if (this.selectedRole === 'admin') {
      this.registerAsAdministrator(formData, registrationForm);
    } else {
      this.registerAsClient(formData, registrationForm);
    }
  }

  private registerAsAdministrator(formData: UserRequest, registrationForm: NgForm): void {
    this.registrationService.registrationAdministrator(formData).subscribe(
      () => {
        this.handleAdminRegistrationSuccess('Admin registration success!', registrationForm);
      },
      (error: HttpErrorResponse) => {
        this.handleRegistrationError(error);
      }
    );
  }

  private registerAsClient(formData: UserRequest, registrationForm: NgForm): void {
    this.registrationService.registrationClient(formData).subscribe(
      () => {
        this.handleClientRegistrationSuccess('Client registration success!', registrationForm);
      },
      (error: HttpErrorResponse) => {
        this.handleRegistrationError(error);
      }
    );
  }

  private handleAdminRegistrationSuccess(successMessage: string, registrationForm: NgForm): void {
    console.log(successMessage);
    this.router.navigate(['/loginAdmin']).then(r => null);
    registrationForm.reset();
  }

  private handleClientRegistrationSuccess(successMessage: string, registrationForm: NgForm): void {
    console.log(successMessage);
    this.router.navigate(['/loginClient']).then(r => null);
    registrationForm.reset();
  }

  private handleRegistrationError(error: HttpErrorResponse): void {
    console.log(error);
    alert(error.message);
  }
}

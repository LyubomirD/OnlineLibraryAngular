import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {

  constructor(private router: Router) {
  }
  redirectToLoginAdmin(): void {
    this.router.navigate(['/loginAdmin']).then(r => null);
  }
  redirectToLoginClient(): void {
    this.router.navigate(['/loginClient']).then(r => null);
  }

  redirectToRegistration(): void {
    this.router.navigate(['/registration']).then(r => null);
  }
}

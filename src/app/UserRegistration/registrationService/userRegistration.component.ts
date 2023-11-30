import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {UserRequest} from '../registrationRequest/userRequest';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserRegistrationService {

  private apiUrl = 'http://localhost:8080/api/v1/registration';

  constructor(private http: HttpClient) {
  }

  public registrationAdministrator(request: UserRequest): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/administrator`, request);
  }

  public registrationClient(request: UserRequest): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/client`, request);
  }
}

import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {UserLoginRequest} from '../loginRequest/userLoginRequest';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserLoginService {

  private apiUrl = 'http://localhost:8080/api/v1/login';

  constructor(private http: HttpClient) {
  }

  public userLogin(request: UserLoginRequest): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}`, request);
  }


}

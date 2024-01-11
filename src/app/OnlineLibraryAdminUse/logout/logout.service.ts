import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LogoutService {
  private logoutUrl = 'http://localhost:8080/api/v1/logout';

  constructor(private http: HttpClient) {}

  logoutUser(): Observable<void> {
    return this.http.post<void>(this.logoutUrl, null, { withCredentials: true });
  }
}

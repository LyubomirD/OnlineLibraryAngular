import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CookieService } from '../../CookieManagement/cookie.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginUrl = 'http://localhost:8080/api/v1/login';

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  private handleError(error: HttpErrorResponse): Observable<any> {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error: ${error.status}, ${error.error.error || 'Unknown error'}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  login(username: string, password: string): Observable<any> {
    const credentials = btoa(`${username}:${password}`);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Basic ${credentials}`,
    });

    return this.http.post<any>(this.loginUrl, null, { headers, observe: 'response' })
      .pipe(
        tap((response: HttpResponse<any>) => {
          const responseBody = response.body;
          if (responseBody && responseBody.sessionId) {
            const sessionId = responseBody.sessionId;
            console.log('Session ID: ' + sessionId);
            this.cookieService.setCookie('MY_SESSION_ID', sessionId);
            console.log('Cookie: ' + this.cookieService.getCookie('MY_SESSION_ID'));
          }
        }),
        catchError(this.handleError)
      );
  }
}

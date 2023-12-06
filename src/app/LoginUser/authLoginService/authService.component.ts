import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = 'http://localhost:8080/api/v1/login';

  constructor(private http: HttpClient) { }

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

  login(username: string, password: string, rememberMe: boolean): Observable<any> {
    const credentials = btoa(`${username}:${password}`);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Basic ${credentials}`
    });

    const options = {
      headers,
      withCredentials: true,
      observe: 'response' as const
    };

    const body = { email: username, password, rememberMe };

    return this.http.post(this.loginUrl, body, options)
      .pipe(
        tap((response: HttpResponse<any>) => {
          // Extract cookies from the response headers
          const cookies = response.headers.getAll('Set-Cookie');
          console.log('Received cookies:', cookies);

          // Optionally, navigate to a new page or perform other actions

          // If needed, you can also access specific cookie values, e.g., for 'SESSION_ID':
          const sessionIdCookie = response.headers.get('Set-Cookie');
          const sessionId = sessionIdCookie ? sessionIdCookie.split(';')[0].split('=')[1] : null;
          console.log('Extracted SESSION_ID:', sessionId);
        }),
        catchError(this.handleError)
      );
  }

}

import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {BorrowRequest} from '../borrowBookRequest/borrowRequest';
import {SessionHeader} from '../../../CookieManagement/sessionheader';
import {CookieService} from '../../../CookieManagement/cookie.service';

@Injectable({
  providedIn: 'root',
})
export class BorrowBookService {
  private apiUrl = 'http://localhost:8080/api/v1/book-borrow';

  constructor(private http: HttpClient, private cookieService: CookieService) {
  }

  private getSessionHeader(): SessionHeader {
    const cookie = this.cookieService.getCookie('MY_SESSION_ID');
    console.log('Cookie: ' + cookie);
    const options = {
      headers: {
        'Content-Type': 'application/json',
        'Your-Custom-Cookie-Header': cookie,
      },
    };

    return options;
  }

  public viewUserBooks(): Observable<void> {
    const options = this.getSessionHeader();
    return this.http.get<void>(`${this.apiUrl}/view`, options);
  }

  public borrowBooks(request: BorrowRequest): Observable<void> {
    const options = this.getSessionHeader();
    console.log('Options: ' + options.headers);
    return this.http.post<void>(`${this.apiUrl}/borrow`, request, options);
  }

  public removeBorrowedBook(request: BorrowRequest): Observable<void> {
    const options = this.getSessionHeader();
    return this.http.put<void>(`${this.apiUrl}/remove`, request, options);
  }
}

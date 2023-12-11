import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {LibraryRequest} from '../../OnlineLibraryMainPage/library/bookAndCategoryRequest/libraryRequest';
import {CookieService} from '../../CookieManagement/cookie.service';
import {SessionHeader} from '../../CookieManagement/sessionheader';


@Injectable({
  providedIn: 'root',
})
export class PersonalLibraryService {
  private apiUrl = 'http://localhost:8080/api/v1/book-borrow/view';

  constructor(private http: HttpClient, private cookieService: CookieService) {
  }

  private getSessionHeader(): SessionHeader {
    const cookie = this.cookieService.getCookie('MY_SESSION_ID');

    const options = {
      headers: {
        'Content-Type': 'application/json',
        'Your-Custom-Cookie-Header': cookie,
      },
    };

    return options;
  }

  public getUserBooks(): Observable<LibraryRequest []> {
    const options = this.getSessionHeader();
    return this.http.get<LibraryRequest[]>(`${this.apiUrl}`, options);
  }
}

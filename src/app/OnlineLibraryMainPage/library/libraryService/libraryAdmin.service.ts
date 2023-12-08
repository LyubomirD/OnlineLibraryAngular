import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { LibraryRequest } from '../bookAndCategoryRequest/libraryRequest';
import { CookieService } from '../../../CookieManagement/cookie.service';
import { SessionHeader } from '../../../CookieManagement/sessionheader';


@Injectable({
  providedIn: 'root',
})
export class LibraryAdminService {
  private apiUrl = 'http://localhost:8080/api/v1/library-admin';

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

  public getBookIdByTitle(title: string, author: string): Observable<number> {
    const options = this.getSessionHeader();
    return this.http.get<number>(`${this.apiUrl}/get-bookId/${title}/${author}`, options);
  }

  public includeNewBookToLibrary(request: LibraryRequest): Observable<void> {
    const options = this.getSessionHeader();
    return this.http.post<void>(`${this.apiUrl}/add-book`, request, options);
  }

  public updateBookInformation(bookId: number, request: LibraryRequest): Observable<void> {
    const options = this.getSessionHeader();
    return this.http.put<void>(`${this.apiUrl}/update-book/${bookId}`, request, options);
  }

  public deleteBookFromLibrary(bookId: number): Observable<void> {
    const options = this.getSessionHeader();
    return this.http.delete<void>(`${this.apiUrl}/delete-book/${bookId}`, options);
  }
}

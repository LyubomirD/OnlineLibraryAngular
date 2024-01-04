import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {LibraryRequest} from '../bookAndCategoryRequest/libraryRequest';
import {CookieService} from '../../../CookieManagement/cookie.service';
import {SessionHeader} from '../../../CookieManagement/sessionheader';


@Injectable({
  providedIn: 'root',
})
export class LibraryAdminService {
  private apiUrl = 'http://localhost:8080/api/v1/library-admin';

  constructor(private http: HttpClient) {
  }

  public getBookIdByTitle(title: string, author: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/get-bookId/${title}/${author}`, {withCredentials: true});
  }

  public includeNewBookToLibrary(request: LibraryRequest): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/add-book`, request, {withCredentials: true});
  }

  public updateBookInformation(bookId: number, request: LibraryRequest): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/update-book/${bookId}`, request, {withCredentials: true});
  }

  public deleteBookFromLibrary(bookId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete-book/${bookId}`, {withCredentials: true});
  }
}

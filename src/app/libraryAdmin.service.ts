import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {LibraryRequest} from './libraryRequest';

@Injectable({
  providedIn: 'root',
})
export class LibraryAdminService {
  private apiUrl = 'http://localhost:8080/api/v1/library-admin';

  constructor(private http: HttpClient) {
  }

  public getBookIdByTitle(title: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/get-bookId/${title}`);
  }
  public includeNewBookToLibrary(request: LibraryRequest): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/add-book`, request);
  }

  public updateBookInformation(bookId: number, request: LibraryRequest): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/update-book/${bookId}`, request);
  }


  public deleteBookFromLibrary(bookId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete-book/${bookId}`);
  }
}

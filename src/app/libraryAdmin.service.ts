import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LibraryAdminRequest } from './libraryAdminRequest';
import { LibraryUserRequest } from './libraryUserRequest';

@Injectable({
  providedIn: 'root',
})
export class LibraryAdminService {
  private apiUrl = 'http://localhost:8080/api/v1/library-admin';

  constructor(private http: HttpClient) {}

  public getLibraryData(): Observable<LibraryUserRequest[]> {
    return this.http.get<LibraryUserRequest[]>(`${this.apiUrl}`);
  }

  public includeNewBookToLibrary(request: LibraryAdminRequest): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/add-book`, request);
  }

  public updateBookInformation(bookId: number, request: LibraryAdminRequest): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/update-book/${bookId}`, request);
  }

  public deleteBookFromLibrary(bookId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete-book/${bookId}`);
  }
}

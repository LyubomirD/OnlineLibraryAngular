import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LibraryRequest } from '../bookAndCategoryRequest/libraryRequest';
import { AuthService } from '../../../Login/LoginAdmin/authLoginService/authAdminService.component';

@Injectable({
  providedIn: 'root',
})
export class LibraryAdminService {
  private apiUrl = 'http://localhost:8080/api/v1/library-admin';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwtToken');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }

  public getBookIdByTitle(title: string, author: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/get-bookId/${title}/${author}`, { headers: this.getHeaders() });
  }

  public includeNewBookToLibrary(request: LibraryRequest): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/add-book`, request, { headers: this.getHeaders() });
  }

  public updateBookInformation(bookId: number, request: LibraryRequest): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/update-book/${bookId}`, request, { headers: this.getHeaders() });
  }

  public deleteBookFromLibrary(bookId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete-book/${bookId}`, { headers: this.getHeaders() });
  }
}

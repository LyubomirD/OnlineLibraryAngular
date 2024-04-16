import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {LibraryRequest} from '../bookAndCategoryRequest/libraryRequest';


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
}

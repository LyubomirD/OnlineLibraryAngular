import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {BorrowRequest} from '../borrowBookRequest/borrowRequest';

@Injectable({
  providedIn: 'root',
})
export class BorrowBookService {
  private apiUrl = 'http://localhost:8080/api/v1/book-borrow';

  constructor(private http: HttpClient) {
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwtToken');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }

  public borrowBooks(request: BorrowRequest): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/borrow`, request, {headers: this.getHeaders()});
  }

  public removeBorrowedBook(request: BorrowRequest): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/remove`, request, {headers: this.getHeaders()});
  }
}

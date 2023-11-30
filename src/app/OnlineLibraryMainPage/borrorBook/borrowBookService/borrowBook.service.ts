import {HttpClient} from '@angular/common/http';
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

  public viewUserBooks(): Observable<void> {
    return this.http.get<void>(`${this.apiUrl}/view`);
  }

  public borrowBooks(request: BorrowRequest): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/borrow`, request);
  }

  public removeBorrowedBook(request: BorrowRequest): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/remove`, request);
  }
}

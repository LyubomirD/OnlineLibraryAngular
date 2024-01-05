import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {LibraryRequest} from '../../OnlineLibraryMainPage/library/bookAndCategoryRequest/libraryRequest';


@Injectable({
  providedIn: 'root',
})
export class PersonalLibraryService {
  private apiUrl = 'http://localhost:8080/api/v1/book-borrow/view';

  constructor(private http: HttpClient) {
  }

  public getUserBooks(): Observable<LibraryRequest []> {
    return this.http.get<LibraryRequest[]>(`${this.apiUrl}`, {withCredentials: true});
  }
}

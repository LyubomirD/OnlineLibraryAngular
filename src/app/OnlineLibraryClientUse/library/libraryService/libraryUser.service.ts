import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {LibraryRequest} from '../bookAndCategoryRequest/libraryRequest';

@Injectable({
  providedIn: 'root',
})
export class LibraryUserService {
  private apiUrl = 'http://localhost:8080/api/v1/library-user';

  constructor(private http: HttpClient) {
  }

  public getLibraryData(): Observable<LibraryRequest[]> {
    return this.http.get<LibraryRequest[]>(`${this.apiUrl}`);
  }

}

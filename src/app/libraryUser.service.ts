import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LibraryUserRequest } from './libraryUserRequest';

@Injectable({
  providedIn: 'root',
})
export class LibraryUserService {
  private apiUrl = 'http://localhost:8080/api/v1/library-user';

  constructor(private http: HttpClient) {}

  public getLibraryData(): Observable<LibraryUserRequest[]> {
    return this.http.get<LibraryUserRequest[]>(`${this.apiUrl}`);
  }

  public searchBooksByTitle(title: string): Observable<LibraryUserRequest[]> {
    if (!title || title.trim() === '') {
      console.error('Invalid title for book search');
      return Observable.throw('Invalid title for book search');
    }

    const searchUrl = `${this.apiUrl}/search/${title}`;
    return this.http.get<LibraryUserRequest[]>(searchUrl);
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LibraryRequest } from './libraryRequest';

@Injectable({
  providedIn: 'root',
})
export class LibraryUserService {
  private apiUrl = 'http://localhost:8080/api/v1/library-user';

  constructor(private http: HttpClient) {}

  public getLibraryData(): Observable<LibraryRequest[]> {
    return this.http.get<LibraryRequest[]>(`${this.apiUrl}`);
  }

  public searchBooksByTitle(title: string): Observable<LibraryRequest[]> {
    if (!title || title.trim() === '') {
      console.error('Invalid title for book search');
      return Observable.throw('Invalid title for book search');
    }

    const searchUrl = `${this.apiUrl}/search/${title}`;
    return this.http.get<LibraryRequest[]>(searchUrl);
  }

}

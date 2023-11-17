import { Component, OnInit } from '@angular/core';
import { LibraryAdminRequest } from './libraryAdminRequest';
import { LibraryUserRequest } from './libraryUserRequest';
import { LibraryAdminService } from './libraryAdmin.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public libraryRequest: LibraryUserRequest[] = [];
  public editBook: LibraryAdminRequest;
  public deleteBook: LibraryAdminRequest;

  constructor(private libraryService: LibraryAdminService) {}

  ngOnInit(): void {
    this.loadLibraryData();
  }

  public loadLibraryData(): void {
    this.libraryService.getLibraryData().subscribe(
      (response: LibraryUserRequest[]) => {
        this.libraryRequest = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  onOpenModal(param: LibraryUserRequest, action: string): void {
    switch (action) {
      case 'add':
        this.editBook = {
          title: '',
          author: '',
          coAuthor: '',
          category: [],
        };
        this.deleteBook = null;
        break;

      case 'edit':
        this.editBook = { ...param, category: [...param.category] };
        this.deleteBook = null;
        break;

      case 'delete':
        this.editBook = null;
        this.deleteBook = { ...param, category: [...param.category] };
        break;

      default:
        console.error('Invalid action: ' + action);
        break;
    }

  }
}

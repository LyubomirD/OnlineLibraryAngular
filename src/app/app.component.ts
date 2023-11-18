import {Component, OnInit} from '@angular/core';
import {LibraryRequest} from './libraryRequest';
import {LibraryAdminService} from './libraryAdmin.service';
import {HttpErrorResponse} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import {LibraryUserService} from './libraryUser.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public libraryRequest: LibraryRequest[] = [];
  public editBook: LibraryRequest;
  public deleteBook: LibraryRequest;

  constructor(private libraryService: LibraryAdminService, private librarySearchServer: LibraryUserService) {
  }

  ngOnInit(): void {
    this.loadLibraryData();
  }

  public loadLibraryData(): void {
    this.librarySearchServer.getLibraryData().subscribe(
      (response: LibraryRequest[]) => {
        this.libraryRequest = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  onOpenModal(book: LibraryRequest, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';

    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addBookModal');
    }
    if (mode === 'edit') {
      this.editBook = book;
      button.setAttribute('data-target', '#updateBookModal');
    }
    if (mode === 'delete') {
      this.deleteBook = book;
      button.setAttribute('data-target', '#deleteBookModal');
    }
    container.appendChild(button);
    button.click();
  }

  onAddBook(addForm: NgForm): void {
    document.getElementById('add-book-form').click();
    this.libraryService.includeNewBookToLibrary(addForm.value).subscribe(
      () => {
        console.log('Book Added');
        this.loadLibraryData();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  onUpdateBook(book: LibraryRequest): void {
    this.libraryService.updateBookInformation(book.id, book).subscribe(
      () => {
        console.log('Book Updated');
        this.loadLibraryData();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  onDeleteBook(bookId: number): void {
    this.libraryService.deleteBookFromLibrary(bookId).subscribe(
      () => {
        console.log('Book Deleted');
        this.loadLibraryData();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}

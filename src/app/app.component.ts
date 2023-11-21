import {Component, OnInit} from '@angular/core';
import {LibraryRequest} from './requestModels/libraryRequest';
import {LibraryAdminService} from './libraryService/libraryAdmin.service';
import {HttpErrorResponse} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import {LibraryUserService} from './libraryService/libraryUser.service';
import {Category} from './requestModels/category';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public libraryRequest: LibraryRequest[] = [];
  public editBook: LibraryRequest;
  public deleteBook: LibraryRequest;
  public selectedBookId: number;


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

  getCategoryGenres(categories: Category[] | undefined): string {
    if (!categories || categories.length === 0) {
      return 'Unknown Category';
    }
    return categories.map(category => category.genre).join(', ');
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
      this.getBookIdByTitle(book.title, book.author);
      button.setAttribute('data-target', '#updateBookModal');
    }
    if (mode === 'delete') {
      this.deleteBook = book;
      this.getBookIdByTitle(book.title, book.author);
      button.setAttribute('data-target', '#deleteBookModal');
    }
    container.appendChild(button);
    button.click();
  }

  getBookIdByTitle(title: string, author: string): void {
    this.libraryService.getBookIdByTitle(title, author).subscribe(
      (bookId: number) => {
        console.log('Book ID for', title, 'and', author, 'is', bookId);
        this.selectedBookId = bookId;
      },
      (error) => {
        console.error('Error getting book ID:', error);
      }
    );
  }

  onAddBook(addForm: NgForm): void {
    document.getElementById('add-book-form').click();

    const formData: LibraryRequest = {
      title: addForm.value.title,
      author: addForm.value.author,
      coAuthor: addForm.value.coAuthor,
      category: [addForm.value.category]
    };

    this.libraryService.includeNewBookToLibrary(formData).subscribe(
      () => {
        console.log('Book Added');
        this.loadLibraryData();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        console.log(formData);
        alert(error.message);
      }
    );
  }

  onUpdateBook(editForm: NgForm): void {
    const formData: LibraryRequest = {
      title: editForm.value.title,
      author: editForm.value.author,
      coAuthor: editForm.value.coAuthor,
      category: [editForm.value.category]
    };


    this.libraryService.updateBookInformation(this.selectedBookId, formData).subscribe(
      () => {
        console.log('Book Updated');
        this.loadLibraryData();
      },
      (error: HttpErrorResponse) => {
        console.log(formData);
        console.error(error);
        alert(error.message);
      }
    );
  }

  onDeleteBook(): void {
    this.libraryService.deleteBookFromLibrary(this.selectedBookId).subscribe(
      () => {
        console.log('Book Deleted');
        this.loadLibraryData();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchBooks(key: string): void {
    console.log(key);
    const results: LibraryRequest[] = [];
    for (const book of this.libraryRequest) {
      if (
           book.title.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || book.author.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || book.coAuthor.toLowerCase().indexOf(key.toLowerCase()) !== -1)
        //|| this.getCategoryGenres(book.category).toLowerCase().indexOf(key.toLowerCase()) !== -1)
      {
        results.push(book);
      }
    }
    this.libraryRequest = results;
    if (results.length === 0 || !key) {
      this.loadLibraryData();
    }
  }

}

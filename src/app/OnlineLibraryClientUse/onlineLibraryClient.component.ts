import {Component, OnInit} from '@angular/core';
import {LibraryRequest} from './library/bookAndCategoryRequest/libraryRequest';
import {LibraryAdminService} from './library/libraryService/libraryAdmin.service';
import {HttpErrorResponse} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import {LibraryUserService} from './library/libraryService/libraryUser.service';
import {Category} from './library/bookAndCategoryRequest/category';
import {BorrowBookService} from './borrorBook/borrowBookService/borrowBook.service';
import {BorrowRequest} from './borrorBook/borrowBookRequest/borrowRequest';
import {Router} from '@angular/router';
import {LogoutService} from './logout/logout.service';

@Component({
  selector: 'app-root',
  templateUrl: './onlineLibraryClient.component.html',
  styleUrls: ['./onlineLibraryClient.component.css'],
})
export class OnlineLibraryClientComponent implements OnInit {
  public libraryRequest: LibraryRequest[] = [];
  public selectedBookId: number;
  public borrowRequest: BorrowRequest;

  constructor(
    private libraryService: LibraryAdminService,
    private librarySearchServer: LibraryUserService,
    private borrowedBookService: BorrowBookService,
    private router: Router,
    private logoutService: LogoutService
  ) {
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

  getBookIdByTitleAndAuthor(title: string, author: string): void {
    this.libraryService.getBookIdByTitle(title, author).subscribe(
      (bookId: number) => {
        this.selectedBookId = bookId;
      },
      (error) => {
        console.error('Error getting book ID:', error);
      }
    );
  }

  onBorrowModel(borrowedBook: BorrowRequest, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode === 'borrow') {
      this.borrowRequest = borrowedBook;
      this.borrowBookFromLibrary(borrowedBook);
      button.setAttribute('data-target', '#borrowBookModal');
    }
    if (mode === 'remove') {
      this.borrowRequest = borrowedBook;
      this.removeBookFromYourLibrary(borrowedBook);
      button.setAttribute('data-target', '#removeBookModal');
    }

    container.appendChild(button);
    button.click();
  }

  borrowBookFromLibrary(book: BorrowRequest): void {

    const modifiedBorrowedBook: BorrowRequest = {
      title: book.title,
      author: book.author,
      coAuthor: book.coAuthor,
      category: book.category
    };
    this.borrowedBookService.borrowBooks(modifiedBorrowedBook).subscribe(
      () => {
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  private removeBookFromYourLibrary(book: BorrowRequest): void {
    const modifiedBorrowedBook: BorrowRequest = {
      title: book.title,
      author: book.author,
      coAuthor: book.coAuthor,
      category: book.category
    };
    this.borrowedBookService.removeBorrowedBook(modifiedBorrowedBook).subscribe(
      () => {
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchBooks(key: string): void {
    const results: LibraryRequest[] = [];
    const lowercaseKey = this.removeSymbolsAndLowerCase(key);

    for (const book of this.libraryRequest) {
      const title = this.removeSymbolsAndLowerCase(book.title) || '';
      const author = this.removeSymbolsAndLowerCase(book.author) || '';
      const coAuthor = this.removeSymbolsAndLowerCase(book.coAuthor) || '';
      const categoryGenres = this.removeSymbolsAndLowerCase(this.getCategoryGenres(book.category)) || '';

      if (
        title.indexOf(lowercaseKey) !== -1 ||
        author.indexOf(lowercaseKey) !== -1 ||
        coAuthor.indexOf(lowercaseKey) !== -1 ||
        categoryGenres.indexOf(lowercaseKey) !== -1
      ) {
        results.push(book);
      }
    }

    this.libraryRequest = results;
    if (results.length === 0 || !key) {
      this.loadLibraryData();
    }
  }

  private removeSymbolsAndLowerCase(str: string): string {
    return str?.replace(/[.,?"'!;:]/g, '').toLowerCase() || '';
  }

  goToPersonalLibrary(): void {
    this.router.navigate(['/personal-library-client']).then(r => null);
  }

  logout(): void {
    this.logoutService.logoutUser().subscribe(
      () => {
        console.log('User logged out successfully.');
        this.router.navigate(['/homepage']).then(r => null);
      },
      (error) => {
        console.error('Error during logout:', error);
      }
    );
  }
}

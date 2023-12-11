import { Component, OnInit } from '@angular/core';
import { LibraryRequest } from '../OnlineLibraryMainPage/library/bookAndCategoryRequest/libraryRequest';
import { HttpErrorResponse } from '@angular/common/http';
import { PersonalLibraryService } from './personalLibraryService/personalLibrary.service';
import { Category } from '../OnlineLibraryMainPage/library/bookAndCategoryRequest/category';
import { BorrowRequest } from '../OnlineLibraryMainPage/borrorBook/borrowBookRequest/borrowRequest';
import { BorrowBookService } from '../OnlineLibraryMainPage/borrorBook/borrowBookService/borrowBook.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './personalLibrary.component.html',
  styleUrls: ['./personalLibrary.component.css'],
})
export class PersonalLibraryComponent implements OnInit {
  public libraryRequest: LibraryRequest[] = [];
  public borrowRequest: BorrowRequest;

  constructor(
    private personalLibrary: PersonalLibraryService,
    private borrowedBookService: BorrowBookService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadLibraryData();
  }

  public loadLibraryData(): void {
    this.personalLibrary.getUserBooks().subscribe(
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
    return categories.map((category) => category.genre).join(', ');
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
      category: book.category,
    };
    this.borrowedBookService.borrowBooks(modifiedBorrowedBook).subscribe(
      () => {},
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
      category: book.category,
    };
    this.borrowedBookService.removeBorrowedBook(modifiedBorrowedBook).subscribe(
      () => {},
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
      const categoryGenres =
        this.removeSymbolsAndLowerCase(
          this.getCategoryGenres(book.category)
        ) || '';

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

  goToOnlineLibrary(): void {
    this.router.navigate(['/online-library']).then((r) => null);
  }
}

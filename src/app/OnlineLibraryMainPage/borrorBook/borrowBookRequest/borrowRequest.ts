import {Category} from '../../library/bookAndCategoryRequest/category';

export interface BorrowRequest {
  title: string;
  author: string;
  coAuthor: string | null;
  category: Category[];
}

import {Category} from '../../library/requestModels/category';

export interface BorrowRequest {
  title: string;
  author: string;
  coAuthor: string | null;
  category: Category[];
}

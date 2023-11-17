import {Category} from './category';

export interface LibraryAdminRequest {
  title: string;
  author: string;
  coAuthor: string;
  category: Category[];
}


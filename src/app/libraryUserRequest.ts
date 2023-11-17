import {Category} from './category';

export interface LibraryUserRequest {
  title: string;
  author: string;
  coAuthor: string;
  category: Category[];
}


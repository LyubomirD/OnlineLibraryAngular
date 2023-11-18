import { Category } from './category';

export interface LibraryRequest {
  id?: number;
  title: string;
  author: string;
  coAuthor: string | null;
  category: Category[];
}

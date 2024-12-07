// ./src/types/Blog.ts

export interface Blog {
  title: string;
  content: string;
  image: string;
  tags: string[];
  readingTime?: number;
}

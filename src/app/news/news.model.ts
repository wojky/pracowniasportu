export interface NewsArticleMeta {
  slug: string;
  title: string;
  date: string | null;
  excerpt: string | null;
  tags: string[];
  image: string | null;
}

export interface NewsArticle extends NewsArticleMeta {
  html: string;
}

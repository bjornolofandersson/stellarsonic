export interface BlogPost<TPost> {
  slug: string;

  url: string;

  collection: string;

  data: TPost;
}

export interface BlogTheme {

}

/**
 * A blog page 
 */
export interface BlogPage<TPost = any> {
  /** Page title */
  title: string;

  /** Page URL */
  url: string;

  /** A list of posts on this page */
  posts: BlogPost<TPost>[];

  theme: BlogTheme;

  start: number;
  end: number;
  total: number;
  currentPage: number;
  size: number;
  lastPage: number;
}

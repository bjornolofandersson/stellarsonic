import { writable, Writable } from "svelte/store";

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

export class BlogStore {
  private static _instance: BlogStore;

  public constructor(
    public readonly theme: Writable<any>,
  ) {}

  public static instance(data: any): BlogStore {
    if (!this._instance) {
      this._instance = new BlogStore(writable(data));
    }
    return this._instance;
  }
}

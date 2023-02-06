import { get, writable, Writable } from "svelte/store";

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
    public readonly slug: string,
    public readonly blog: Writable<any>,
    public readonly theme: Writable<any>,
  ) {}

  public static instance(slug: any, blogData: any, themeData: any): BlogStore {
    if (!this._instance) {
      this._instance = new BlogStore(slug, writable(blogData), writable(themeData));
    }
    return this._instance;
  }

  public async save(): Promise<void> {
    await fetch(`/blogs/${this.slug}.json`, {
      method: 'PUT',
      body: JSON.stringify(get(this.blog)),
    });
  }
}

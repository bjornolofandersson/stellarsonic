import { Entity } from "@lib/interfaces";
import { EntityStore } from "@lib/store";
import { writable } from "svelte/store";

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

export class BlogStore extends EntityStore<any> {
  private static _instance: BlogStore;

  public static instance(entity: Entity<any>): BlogStore {
    if (!this._instance) {
      this._instance = new BlogStore('blogs', writable(entity));
    }
    return this._instance;
  }
}

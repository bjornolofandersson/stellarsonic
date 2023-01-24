import { MediaPlayer, MusicMixPost } from "@lib/interfaces";
import { AudioPlayer } from "./AudioPlayer";
import { MixPlaylist } from "./MixPlaylist";
import { post as mixPost } from '@lib/MixStore';
import { Readable, writable, Writable } from "svelte/store";

let mixPlaylists: Record<string, MixPlaylist> = {};
let posts: Record<string, Promise<any>> = {};
let writablePosts: Record<string, Writable<any>> = {};

async function fetchJson(path: string) {
  const resp = await fetch(path);
  return resp.json();
}

export interface Stellarsonic {
  audioPlayer(): MediaPlayer;

  /**
   * Get a music mix post by slug
   * 
   * @param collection 
   * @param slug 
   */
  post(collection: 'mixes', slug: string): Promise<MusicMixPost>;
  post<T>(collection: string, slug: string): Promise<T>;

  cachePost<T>(collection: string, slug: string, post: T): void;

  writablePost<T>(collection: string, slug: string): Writable<T>;
  writablePost(collection: 'mixes', slug: string): Writable<MusicMixPost>;

  readablePost<T>(collection: string, slug: string): Readable<T>;
  readablePost(collection: 'mixes', slug: string): Readable<MusicMixPost>;

  mixPlaylist(post: MusicMixPost): Promise<MixPlaylist>;
  mixPlaylist(slug: string): Promise<MixPlaylist>;
  
  watchCurrentMixPlaylist(fn: (playlist: MixPlaylist) => void): void;
}

export const Stellarsonic: Stellarsonic = {
  audioPlayer(): MediaPlayer {
    return new AudioPlayer();
  },

  cachePost<T>(collection: string, slug: string, post: T) {
    const path = `/${collection}/${slug}.json`;
    posts[path] = Promise.resolve(post);
    writablePosts[path] = writable(post);
  },

  async post<T>(collection: string, slug: string): Promise<T> {
    const path = `/${collection}/${slug}.json`;
    if (!posts[path]) {
      posts[path] = fetchJson(path);
    }
    return posts[path];
  },

  writablePost<T>(collection: string, slug: string): Writable<T> {
    const path = `/${collection}/${slug}.json`;
    if (!writablePosts[path]) {
      writablePosts[path] = writable({})
      this.post(collection, slug).then(p => {
        writablePosts[path].set(p);
      });
    }
    return writablePosts[path];
  },

  readablePost<T>(collection: string, slug: string): Readable<T> {
    return this.writablePost(collection, slug);
  },

  async mixPlaylist(postOrSlug: MusicMixPost | string): Promise<MixPlaylist> {
    let post;
    if (typeof postOrSlug === 'string') {
      post = await this.post('mixes', postOrSlug);
    } else {
      post = postOrSlug;
    }
    let src = post.audio;

    if (!mixPlaylists[src]) {
      mixPlaylists[src] = new MixPlaylist(Stellarsonic.audioPlayer(), src, post.tracks);
    }
    return mixPlaylists[src];
  },

  watchCurrentMixPlaylist(fn: (playlist: MixPlaylist) => void): void {
    let playlist: MixPlaylist;
    let timer: any;

    mixPost.subscribe(async p => {
      if (p.audio && !playlist) {
        playlist = await Stellarsonic.mixPlaylist(p);
        if (timer) {
          clearInterval(timer);
        }
        timer = setInterval(() => fn(playlist), 100);
      }
    });
  }
}

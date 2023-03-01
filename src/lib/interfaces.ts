import type { Page } from "src/content/config";
import { CollectionEntry } from "astro:content";

export interface PageSummary {
  slug: string;

  title: string;

  description: string;

  image: string;
}
/*
export interface Post {
  title: string;

  subtitle?: string;

  description: string;

  image: string;

  date: string;

  genres: string[];

  tags: string[];
}

export interface MusicMixTrack {
  name: string;

  artist?: string;

  year?: number;

  duration: string;
}

export interface MusicTrack extends MusicMixTrack {
  audio: string;
}

export interface MusicMixPost extends Post {
  audio: string;

  tracks: MusicTrack[];
}
*/

export interface MediaPlayer {
  readonly src: string;
  readonly progress: number;
  readonly duration: number;

  readonly isPaused: boolean;

  load(src: string): void;

  play(src?: string): void;

  pause(): void;

  skipTo(time: number): void;
}

export interface Playlist<T> {
  readonly player: MediaPlayer;
  readonly tracks: T[];
  readonly currentTrack: number;
  readonly currentTrackData: T;
  readonly currentTrackDuration: number;
  readonly currentTrackProgress: number;

  load(): void;
  play(track?: number): void;
  skipNext(): void;
  skipPrev(): void;
  skipTrackTo(time: number): void;

  trackBegin(track: number): number;
  trackEnd(track: number): number;
  trackDuration(track: number): number;

  setTracks(tracks: T[]): void;
}

export interface SitePage {
  path: string;
  title: string;
  type: string;
}

export interface ServerModule {
  collection: string;

  onPage(mount: Mount, path: string, entry: CollectionEntry<any>): void;
}

export interface Entity<T> {
  id: string;

  slug: string;

  collection: string;

  data: T;

  body?: string;
}

export interface MountConfig {
  schema: any;

  editor: any;

  props?: any;
}

export type Mount = (path: string, component: any, config: MountConfig) => void;

export interface PageProps<T> {
  entity: Entity<T>;

  page: Entity<Page>;

  template: Entity<any>;

  navigation: any;

  site: any;

  edit: boolean;
}

export interface Font {
  family: string;
  weight: number;
}

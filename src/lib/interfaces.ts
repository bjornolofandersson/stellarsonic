export interface Post {
  title: string;

  subtitle?: string;

  description: string;

  image: string;

  date: string;

  genres: string[];

  tags: string[];

  colors: string[];
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
  getStaticPaths(config: any): any;
}

export interface Entity<T> {
  id: string;

  slug: string;

  data: T;

  body?: string;
}

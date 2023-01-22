export interface Article {
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

export interface MusicMix extends Article {
  audio: string;

  tracks: MusicTrack[];
}

export interface MediaPlayer {
  readonly progress: number;
  readonly duration: number;

  readonly isPaused: boolean;

  play(src?: string): void;

  pause(): void;

  skipTo(time: number): void;
}

export interface Playlist {
  readonly currentTrack: number;
  readonly currentTrackDuration: number;
  readonly currentTrackProgress: number;

  play(track: number): void;
  skipNext(): void;
  skipPrev(): void;

  trackBegin(track: number): number;
  trackEnd(track: number): number;
  trackDuration(track: number): number;
}

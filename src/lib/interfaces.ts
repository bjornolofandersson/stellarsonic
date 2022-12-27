export interface Article {
  title: string;

  subtitle: string;

  image: string;

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

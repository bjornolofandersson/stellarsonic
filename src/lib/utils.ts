import { toSeconds, parse } from 'iso8601-duration';
import { MusicMix, MusicMixTrack } from './interfaces';

export function totalDuration(tracks: MusicMixTrack[]) {
  let duration = 0;
  for (const track of tracks) {
    duration += toSeconds(parse(track.duration));
  }
  return duration;
}

export function uniqueGenres(posts: MusicMix[]) {
  const genres: string[] = [];
  for (let post of posts) {
    genres.push(...post.genres);
  }
  return Array.from(new Set(genres));
}

export function formatTime(t: number) {
  const min = minutes(t);
  const sec = seconds(t);

  return `${min}:${sec < 10 ? '0' + sec : sec}`;
}

export function hours(t: number) {
  return Math.floor(t / 3600);
}

export function minutes(t: number) {
  return Math.floor((t % 3600) / 60);
}

export function seconds(t: number) {
  return Math.floor(t % 60);
}

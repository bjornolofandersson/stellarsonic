import { toSeconds, parse } from 'iso8601-duration';
import { MusicMix } from './interfaces';

export function totalDuration(mix: MusicMix) {
  let duration = 0;
  for (const track of mix.tracks) {
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
  const min = Math.floor(t / 60);
  const sec = Math.floor(t % 60);

  return `${min}:${sec < 10 ? '0' + sec : sec}`;
}

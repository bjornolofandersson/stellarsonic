import { toSeconds, parse } from 'iso8601-duration';
import { MusicMix } from './interfaces';

export function totalDuration(mix: MusicMix) {
  let duration = 0;
  for (const track of mix.tracks) {
    duration += toSeconds(parse(track.duration));
  }
  return duration;
}

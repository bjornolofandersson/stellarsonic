import { toSeconds, parse } from 'iso8601-duration';

let audio: HTMLAudioElement;
let currentTrack: number;

function getOffset(playlist: any, track: number) {
  let offset = 0;
  for (let i=0; i<track; i++) {
    offset += toSeconds(parse(playlist.track[i].duration));
  }
  return offset;
}

export function play(playlist: any, track?: number) {
  let playSrc;
  if (track !== undefined) {
    if (playlist.track[track]?.audio?.contentUrl !== undefined) {
      playSrc = playlist.track[track].audio.contentUrl;
    } else {
      playSrc = playlist.audio.contentUrl;
    }
  }
  if (!audio) {
    audio = new Audio(playSrc);
  } else if (audio.src !== playSrc) {
    audio.pause();
    audio = new Audio(playSrc);
  }
  currentTrack = track || 0;

  audio.play();
  audio.currentTime = getOffset(playlist, currentTrack);
}

export function pause() {
  audio.pause();
}

export function getCurrentTrack() {
  return currentTrack;
}

export function isPlaying(track?: number) {
  const playing = audio && !audio.paused;

  return track !== undefined
    ? playing && currentTrack == track
    : playing;
}

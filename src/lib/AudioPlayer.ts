import { toSeconds, parse } from 'iso8601-duration';
import { MusicMix } from './interfaces';
import { totalDuration } from './utils';


export class MixAudioPlayer {
  private audio: HTMLAudioElement;
  private breakpoints: number[] = [];

  private static instances: Record<string, MixAudioPlayer> = {};

  public static getInstance(playlist: MusicMix) {
    if (this.instances[playlist.audio] === undefined) {
      this.instances[playlist.audio] = new MixAudioPlayer(playlist);
    }
    return this.instances[playlist.audio];
  }

  public constructor(public readonly playlist: MusicMix) {
    this.audio = new Audio(playlist.audio);
    for (let i=0; i<playlist.tracks.length; i++) {
      this.breakpoints.push(this.getOffset(i));
    }
    this.breakpoints.push(totalDuration(playlist));
  }

  private getOffset(track: number) {
    let offset = 0;
    for (let i=0; i<track; i++) {
      offset += toSeconds(parse(this.playlist.tracks[i].duration));
    }
    return offset;
  }

  public play(track?: number) {
    for (const player of Object.values(MixAudioPlayer.instances)) {
      if (player !== this) {
        player.pause();
      }
    }

    if (track !== undefined) {
      if (track === this.getCurrentTrack()) {
        this.audio.play();
      } else {
        this.audio.currentTime = this.breakpoints[track] + 0.01;
        this.audio.play();
      }
    } else {
      this.audio.play();
    }
  }

  public pause() {
    this.audio.pause();
  }

  public skipNext() {
    const currentTrack = this.getCurrentTrack();

    if (currentTrack >= this.playlist.tracks.length - 1) {
      this.audio.currentTime = 0;
      this.audio.pause();
    } else {
      this.play(currentTrack + 1);
    }
  }

  public skipPrev() {
    const i = this.getCurrentTrack();

    if (i > 0) {
      this.play(i - 1);
    } else {
      this.skipTrackTo(0);
    }
  }

  public skipTrackTo(seconds: number) {
    this.audio.currentTime = this.breakpoints[this.getCurrentTrack()] + seconds;
  }

  public getCurrentTrack() {
    const t = this.audio.currentTime;
    for (let i=0; i<this.breakpoints.length; i++) {
      if (t < this.breakpoints[i]) {
        return i - 1;
      }
    }
    return this.playlist.tracks.length - 1;
  }

  public getCurrentTrackProgress() {
    return this.audio.currentTime - this.breakpoints[this.getCurrentTrack()];
  }

  public getCurrentTrackDuration() {
    const t = this.getCurrentTrack();
    return this.breakpoints[t + 1] - this.breakpoints[t];
  }

  public getTrackDuration(track: number) {
    return this.breakpoints[track + 1] - this.breakpoints[track];
  }

  public getTrackData(track: number) {
    return this.playlist.tracks[track];
  }

  public getProgress() {
    return this.audio.currentTime;
  }

  public getAudioDuration() {
    return this.audio.duration;
  }

  public getMixDuration() {
    return this.breakpoints[this.breakpoints.length - 1];
  }

  public isPlaying(track?: number) {
    const playing = this.audio && !this.audio.paused;

    return track !== undefined
      ? playing && this.getCurrentTrack() == track
      : playing;
  }
}

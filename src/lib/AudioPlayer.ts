import { toSeconds, parse } from 'iso8601-duration';
import { MusicMixTrack } from './interfaces';
import { totalDuration } from './utils';


export class MixAudioPlayer {
  private audio: HTMLAudioElement;
  private breakpoints: number[] = [];
  private tracks: MusicMixTrack[] = [];

  private static instances: Record<string, MixAudioPlayer> = {};

  public static getInstance(audio: string) {
    if (this.instances[audio] === undefined) {
      this.instances[audio] = new MixAudioPlayer(audio);
    }
    return this.instances[audio];
  }

  public constructor(src: string) {
    this.audio = new Audio(src);
  }

  public setTracks(tracks: MusicMixTrack[]) {
    this.tracks = tracks;
    for (let i=0; i<tracks.length; i++) {
      this.breakpoints.push(this.getOffset(i));
    }
    this.breakpoints.push(totalDuration(tracks));
  }

  public updateStart(track: number, t: number) {
    this.breakpoints[track] = t;
  }

  public updateEnd(track: number, t: number) {
    this.breakpoints[track + 1] = t;
  }

  private getOffset(track: number) {
    let offset = 0;
    for (let i=0; i<track; i++) {
      offset += toSeconds(parse(this.tracks[i].duration));
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

    if (currentTrack >= this.tracks.length - 1) {
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
    return this.tracks.length - 1;
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

  public getTrackTimestamp(track: number) {
    return this.breakpoints[track];
  }

  public getTrackData(track: number) {
    return this.tracks[track];
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

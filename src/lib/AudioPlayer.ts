import { toSeconds, parse } from 'iso8601-duration';
import { MusicMix } from './interfaces';


export class MixAudioPlayer {
  private audio: HTMLAudioElement;
  private breakpoints: number[] = [];

  private static instance: MixAudioPlayer;

  public static getInstance(playlist: MusicMix) {
    console.log("get instance");
    if (!this.instance) {
      console.log("create instance");
      this.instance = new MixAudioPlayer(playlist);
    }
    return this.instance;
  }

  public constructor(private playlist: MusicMix) {
    this.audio = new Audio(playlist.audio);
    for (let i=0; i<playlist.tracks.length; i++) {
      this.breakpoints.push(this.getOffset(i));
    }
  }

  private getOffset(track: number) {
    let offset = 0;
    for (let i=0; i<track; i++) {
      offset += toSeconds(parse(this.playlist.tracks[i].duration));
    }
    return offset;
  }

  public play(track?: number) {
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
      //this.currentTrack = 0;
      this.audio.currentTime = 0;
      this.audio.pause();
    } else {
      this.play(currentTrack + 1);
    }
  }

  public skipPrev() {
    this.play(Math.max(this.getCurrentTrack() - 1, 0));
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

  public getTrackData(track: number) {
    return this.playlist.tracks[track];
  }

  public isPlaying(track?: number) {
    const playing = this.audio && !this.audio.paused;

    return track !== undefined
      ? playing && this.getCurrentTrack() == track
      : playing;
  }
}

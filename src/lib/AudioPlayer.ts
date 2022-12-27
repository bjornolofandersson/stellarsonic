import { toSeconds, parse } from 'iso8601-duration';
import { MusicMix } from './interfaces';


export class MixAudioPlayer {
  private audio: HTMLAudioElement;
  private currentTrack: number = 0;

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
      this.currentTrack = track;
      this.audio.play();
      this.audio.currentTime = this.getOffset(this.currentTrack);
    } else {
      this.audio.play();
    }
  }

  public pause() {
    this.audio.pause();
  }

  public skipNext() {
    if (this.currentTrack >= this.playlist.tracks.length - 1) {
      this.currentTrack = 0;
      this.audio.currentTime = 0;
      this.audio.pause();
    } else {
      this.play(this.currentTrack + 1);
    }
  }

  public skipPrev() {
    this.play(Math.max(this.currentTrack - 1, 0));
  }

  public getCurrentTrack() {
    return this.currentTrack;
  }

  public getTrackData(track: number) {
    return this.playlist.tracks[track];
  }

  public isPlaying(track?: number) {
    const playing = this.audio && !this.audio.paused;

    return track !== undefined
      ? playing && this.currentTrack == track
      : playing;
  }
}

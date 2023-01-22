import { MediaPlayer } from '../interfaces';

/**
 * A media player for HTML audio
 */
export class AudioPlayer implements MediaPlayer {
  private audio: HTMLAudioElement;

  public constructor() {
    this.audio = new Audio();
  }

  public play(src?: string) {
    if (src && src !== this.audio.src) {
      this.audio.src = src;
      this.audio.load();
    }
    return this.audio.play();
  }

  public pause() {
    this.audio.pause();
  }

  public get src(): string {
    return this.audio.src;
  }

  public get progress() {
    return this.audio.currentTime;
  }

  public get duration() {
    return this.audio.duration;
  }

  public get isPaused() {
    return this.audio.paused;
  }

  public skipTo(time: number) {
    this.audio.currentTime = time;
  }
}

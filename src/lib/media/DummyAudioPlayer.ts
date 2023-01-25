import { MediaPlayer } from '../interfaces';

/**
 * A media player for HTML audio
 */
export class DummyAudioPlayer implements MediaPlayer {
  public play(src?: string) {}

  public pause() {}

  public get src(): string {
    return '';
  }

  public get progress() {
    return 0;
  }

  public get duration() {
    return 0;
  }

  public get isPaused() {
    return true;
  }

  public skipTo(time: number) {}
}

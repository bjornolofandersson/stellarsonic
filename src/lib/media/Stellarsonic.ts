import { MediaPlayer } from "@lib/interfaces";
import { AudioPlayer } from "./AudioPlayer";
import { MixPlaylist } from "./MixPlaylist";

export class Stellarsonic {
  private static sAudioPlayer: MediaPlayer;
  private static mixPlaylists: Record<string, MixPlaylist> = {};

  public static audioPlayer(): MediaPlayer {
    if (!this.sAudioPlayer) {
      this.sAudioPlayer = new AudioPlayer();
    }
    return this.sAudioPlayer;
  }

  public static mixPlaylist(src: string, tracks: any[]): MixPlaylist {
    if (!this.mixPlaylists[src]) {
      this.mixPlaylists[src] = new MixPlaylist(Stellarsonic.audioPlayer(), src, tracks);
    }
    return this.mixPlaylists[src];
  }
}

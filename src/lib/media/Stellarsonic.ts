import { MediaPlayer } from "@lib/interfaces";
import { AudioPlayer } from "./AudioPlayer";
import { DummyAudioPlayer } from "./DummyAudioPlayer";

function isServer() {
  return ! (typeof window != 'undefined' && window.document);
}

export interface Stellarsonic {
  audioPlayer(): MediaPlayer;
}

export const Stellarsonic: Stellarsonic = {
  audioPlayer(): MediaPlayer {
    return isServer() ? new DummyAudioPlayer() : new AudioPlayer();
  },
}

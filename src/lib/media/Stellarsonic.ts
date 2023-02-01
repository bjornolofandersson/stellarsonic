import { MediaPlayer } from "@lib/interfaces";
import { AudioPlayer } from "./AudioPlayer";
import { get, Writable } from "svelte/store";
import { DummyAudioPlayer } from "./DummyAudioPlayer";

function isServer() {
  return ! (typeof window != 'undefined' && window.document);
}

export interface Stellarsonic {
  audioPlayer(): MediaPlayer;
}

export class PostStore<TPost> {
  public constructor(
    public readonly collection: string,
    public readonly slug: string,
    public readonly post: Writable<TPost>,
  ) {}

  public async save(): Promise<void> {
    await fetch(`/${this.collection}/${this.slug}.json`, {
      method: 'PUT',
      body: JSON.stringify(get(this.post)),
    });
  }
}


export const Stellarsonic: Stellarsonic = {
  audioPlayer(): MediaPlayer {
    return isServer() ? new DummyAudioPlayer() : new AudioPlayer();
  },
}

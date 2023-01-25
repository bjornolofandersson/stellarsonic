import { MediaPlayer, MusicMixPost } from "@lib/interfaces";
import { AudioPlayer } from "./AudioPlayer";
import { MixPlaylist } from "./MixPlaylist";
import { get, writable, Writable } from "svelte/store";
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

export class MixStore extends PostStore<MusicMixPost> {
  private static mixes: Record<string, MixStore> = {}

  public constructor(
    slug: string,
    post: Writable<MusicMixPost>,
    public readonly playlist: MixPlaylist
  ) {
    super('mixes', slug, post);
  }

  public static instance(slug: string, data: MusicMixPost): MixStore {
    if (!this.mixes[slug]) {
      this.mixes[slug] = new MixStore(
        slug, writable(data), new MixPlaylist(Stellarsonic.audioPlayer(), data.audio, data.tracks)
      );
    }
    return this.mixes[slug];
  }
}

export const Stellarsonic: Stellarsonic = {
  audioPlayer(): MediaPlayer {
    return isServer() ? new DummyAudioPlayer() : new AudioPlayer();
  },
}

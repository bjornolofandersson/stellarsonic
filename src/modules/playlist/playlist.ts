import { MusicMixPost } from "@lib/interfaces";
import { MixPlaylist } from "@lib/media/MixPlaylist";
import { PostStore, Stellarsonic } from "@lib/media/Stellarsonic";
import { writable, Writable } from "svelte/store";

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

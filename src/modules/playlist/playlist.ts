import { Entity, MusicMixPost } from "@lib/interfaces";
import { MixPlaylist } from "@lib/media/MixPlaylist";
import { Stellarsonic } from "@lib/media/Stellarsonic";
import { EntityStore } from "@lib/store";
import { writable, Writable } from "svelte/store";

export class MixStore extends EntityStore<MusicMixPost> {
  private static mixes: Record<string, MixStore> = {}

  public constructor(
    entity: Writable<Entity<MusicMixPost>>,
    public readonly playlist: MixPlaylist
  ) {
    super('mixes', entity);
  }

  public static instance(entity: Entity<MusicMixPost>): MixStore {
    if (!this.mixes[entity.id]) {
      this.mixes[entity.id] = new MixStore(
        writable(entity), new MixPlaylist(Stellarsonic.audioPlayer(), entity.data.audio, entity.data.tracks)
      );
    }
    return this.mixes[entity.id];
  }
}

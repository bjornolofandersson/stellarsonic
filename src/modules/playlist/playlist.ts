import type { Entity } from "@lib/interfaces";
import { MixPlaylist } from "@lib/media/MixPlaylist";
import { Stellarsonic } from "@lib/media/Stellarsonic";
import { EntityStore } from "@lib/store";
import { writable, Writable } from "svelte/store";
import type { MusicMix } from './playlist.server';

export class MixStore extends EntityStore<MusicMix> {
  private static mixes: Record<string, MixStore> = {}

  public constructor(
    entity: Writable<Entity<MusicMix>>,
    public readonly playlist: MixPlaylist
  ) {
    super('mixes', entity);
  }

  public static instance(entity: Entity<MusicMix>): MixStore {
    if (!this.mixes[entity.id]) {
      this.mixes[entity.id] = new MixStore(
        writable(entity), new MixPlaylist(Stellarsonic.audioPlayer(), entity.data.audio, entity.data.tracks)
      );
    }
    return this.mixes[entity.id];
  }
}

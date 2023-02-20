import type { Entity } from "@lib/interfaces";
import { EntityStore } from "@lib/store";
import { writable, Writable } from "svelte/store";

export class IndexStore extends EntityStore<any> {
  private static indicies: Record<string, any> = {}

  public constructor(
    entity: Writable<Entity<any>>,
  ) {
    super('indices', entity);
  }

  public static instance(entity: Entity<any>): IndexStore {
    if (!this.indicies[entity.id]) {
      this.indicies[entity.id] = new IndexStore(writable(entity));
    }
    return this.indicies[entity.id];
  }
}

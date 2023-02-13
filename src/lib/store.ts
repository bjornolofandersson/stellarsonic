import { get, Writable } from "svelte/store";
import { Entity } from "./interfaces";

export class EntityStore<T> {
  public constructor(
    public readonly collection: string,
    public readonly entity: Writable<Entity<T>>,
  ) {}

  public async save(): Promise<void> {
    await fetch(`/${this.collection}/${get(this.entity).id}.json`, {
      method: 'PUT',
      body: JSON.stringify(get(this.entity)),
    });
  }
}

import { get, Writable } from "svelte/store";
import { Entity } from "./interfaces";

export class EntityStore<T> {
  public constructor(
    public readonly collection: string,
    public readonly entity: Writable<Entity<T>>,
  ) {}

  public async save(): Promise<void> {
    const body = JSON.stringify(get(this.entity));

    const resp = await fetch(`/${this.collection}/${get(this.entity).id}.json`, {
      method: 'PUT',
      body,
    });

    if (resp.status === 404) {
      await fetch(`/${this.collection}.json`, {
        method: 'POST',
        body,
      });
    }
  }
}

import { get, writable, Writable } from "svelte/store";
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

let store: Record<string, Writable<Entity<any>>> = {};

export function loadEntity<T>(entity: Entity<T>): Writable<Entity<T>> {
  const id = entity.collection + '.' + entity.slug;
  if (!store[id]) {
    store[id] = writable(entity);
  }
  return store[id];
}

export async function saveEntity<T>(entity: Entity<T>): Promise<void> {
  const body = JSON.stringify(entity);

  const resp = await fetch(`/${entity.collection}/${entity.id}.json`, {
    method: 'PUT',
    body,
  });

  if (resp.status === 404) {
    await fetch(`/${entity.collection}.json`, {
      method: 'POST',
      body,
    });
  }
}

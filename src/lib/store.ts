import { get, writable, Writable } from "svelte/store";
import { Entity } from "./interfaces";

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

  const resp = await fetch(`/api/${entity.collection}/${entity.id}.json`, {
    method: 'PUT',
    body,
  });

  if (resp.status === 404) {
    await fetch(`/api/${entity.collection}.json`, {
      method: 'POST',
      body,
    });
  }
}

export const site = writable({});

export async function saveSite() {
  const body = JSON.stringify(get(site));

  await fetch(`/api/site.json`, {
    method: 'PUT',
    body,
  });
}

export function editorPanel(panel: string) {
  const store = writable(panel);
  const { subscribe, set, update } = store;

  const storedValue = localStorage.getItem('editor-panel')

  if (storedValue) {
    set(storedValue);
  } else {
    set(panel);
  }

  return {
    subscribe,
    set: (p: string) => localStorage.setItem('editor-panel', p),
    update: (cb: any) => {
      const updatedStore = cb(get(store));
      localStorage.setItem('editor-panel', updatedStore);
    }
  };
}

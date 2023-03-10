import { isNode } from 'browser-or-node';
import type { Entity, ModuleDescription } from './interfaces';

export async function entity<T>(collection: string, slug: string): Promise<Entity<T>> {
  let path = `/api/${collection}/${slug}.json`;

  if (isNode) {
    path = 'http://localhost:3000' + path;
  }

  return fetch(path).then(resp => resp.json());
}

export async function deleteEntity(collection: string, id: string): Promise<void> {
  await fetch(`/api/${collection}/${id}.json`, {
    method: 'DELETE'
  });
}

export async function collection<T>(collection: string): Promise<Entity<T>[]> {
  return fetch(`/api/${collection}.json`).then(resp => resp.json());
}

export async function modules(): Promise<Record<string, ModuleDescription>> {
  return fetch(`/api/modules.json`).then(resp => resp.json());
}

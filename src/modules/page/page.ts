import { Entity } from "@lib/interfaces";
import { EntityStore } from "@lib/store";
import { get, writable, Writable } from "svelte/store";

export class PageStore extends EntityStore<any> {
  private static pages: Record<string, any> = {}

  public constructor(
    entity: Writable<Entity<any>>,
  ) {
    super('pages', entity);
  }

  public static instance(entity: Entity<any>): PageStore {
    if (!this.pages[entity.id]) {
      this.pages[entity.id] = new PageStore(writable(entity));
    }
    return this.pages[entity.id];
  }

  public async create(): Promise<void> {
    await fetch(`/pages.json`, {
      method: 'POST',
      body: JSON.stringify(get(this.entity)),
    });
  }
}

export class TemplateStore extends EntityStore<any> {
  private static templates: Record<string, any> = {}

  public constructor(
    entity: Writable<Entity<any>>,
  ) {
    super('templates', entity);
  }

  public static instance(entity: Entity<any>): PageStore {
    if (!this.templates[entity.id]) {
      this.templates[entity.id] = new TemplateStore(writable(entity));
    }
    return this.templates[entity.id];
  }
}
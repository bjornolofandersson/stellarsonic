import { Entity } from "@lib/interfaces";
import { EntityStore } from "@lib/store";
import { get, writable } from "svelte/store";
import type { Page } from './page.server';

export class PageStore extends EntityStore<Page> {
  private static pages: Record<string, any> = {}

  public static instance(entity: Entity<any>): PageStore {
    if (!this.pages[entity.id]) {
      this.pages[entity.id] = new PageStore('pages', writable(entity));
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

  public static instance(entity: Entity<any>): TemplateStore {
    if (!this.templates[entity.id]) {
      this.templates[entity.id] = new TemplateStore('templates', writable(entity));
    }
    return this.templates[entity.id];
  }
}
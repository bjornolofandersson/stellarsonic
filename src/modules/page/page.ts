import { get, writable, Writable } from "svelte/store";

export class PageStore {
  private static pages: Record<string, any> = {}

  public constructor(
    public readonly page: Writable<any>,
  ) {}

  public static instance(data: any): PageStore {
    if (!this.pages[data.slug]) {
      this.pages[data.slug] = new PageStore(writable(data));
    }
    return this.pages[data.slug];
  }

  public async save(): Promise<void> {
    await fetch(`/pages/${this.slug}.json`, {
      method: 'PUT',
      body: JSON.stringify(get(this.page)),
    });
  }

  public async create(): Promise<void> {
    await fetch(`/pages.json`, {
      method: 'POST',
      body: JSON.stringify(get(this.page)),
    });
  }
}

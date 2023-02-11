import { get, writable, Writable } from "svelte/store";

export class PageStore {
  private static pages: Record<string, any> = {}

  public constructor(
    public readonly page: Writable<any>,
    public readonly base: Writable<any>,
  ) {}

  public static instance(data: any, baseStyle: any): PageStore {
    if (!this.pages[data.id]) {
      this.pages[data.id] = new PageStore(writable(data), writable(baseStyle));
    }
    return this.pages[data.id];
  }

  public async save(): Promise<void> {
    await fetch(`/pages/${get(this.page).id}.json`, {
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

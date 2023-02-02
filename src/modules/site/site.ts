import { get, writable, Writable } from "svelte/store";

export class SiteStore {
  private static _instance: SiteStore;

  public constructor(
    public readonly site: Writable<any>,
  ) {}

  public static instance(data: any): SiteStore {
    if (!this._instance) {
      this._instance = new SiteStore(writable(data));
    }
    return this._instance;
  }

  public async save() {
    await fetch('/site.json', {
      method: 'PUT',
      body: JSON.stringify(get(this.site)),
    });
  }
}

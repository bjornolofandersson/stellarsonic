import { Writable } from 'svelte/store';

export interface EditorMenuItem {
  name: string;

  icon: string;

  panel: any;

  view?: any;
}

export abstract class PostEditor<TPost> {
  public constructor(
    public readonly post: Writable<TPost>,
    public readonly slug: string,
    public readonly assets: string[],
  ) {}

  public async save(): Promise<void> {
    console.log('save post');
  }
}

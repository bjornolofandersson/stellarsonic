import { MixStore } from '@lib/media/Stellarsonic';
import MixEditor from './mixEditor';

export function createPostEditor(collection: string, slug: string, data: any, assets: string[]) {
  switch(collection) {
    case 'mixes':
      let {post, playlist} = MixStore.instance(slug, data);
      return {
        editor: new MixEditor(post, slug, assets, playlist),
        layout: MixEditor.layout,
        views: MixEditor.views,
      };
    default:
      throw new Error(`No editor to handle posts of collection: ${collection}`);
  }
}

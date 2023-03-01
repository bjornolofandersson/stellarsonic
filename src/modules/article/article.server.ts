import { CollectionController } from "@lib/CollectionController";
import { Mount } from "@lib/interfaces";
import { CollectionEntry, z } from "astro:content";
import ArticleComponent from './article.astro';

export const collection = 'articles';
export const schema = z.object({
  title: z.string().optional(),
  description: z.string(),
  image: z.string(),
});

export type Article = z.infer<typeof schema>;

export function onPage(mount: Mount, path: string, entry: CollectionEntry<'articles'>) {
  const col = new CollectionController(entry.collection);

  mount(path, ArticleComponent, {
    schema: {},
    editor: {
      entity: CollectionController.makeEntity(entry),
      assets: col.getAssetPaths(entry.slug),
    },
  });
}

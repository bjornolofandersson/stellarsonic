import { Mount } from "@lib/interfaces";
import { CollectionEntry, z } from "astro:content";
import ArticleComponent from './article.astro';

export const collection = 'articles';
export const schema = z.object({
  title: z.string(),
  description: z.string(),
  image: z.string(),
});

export type Article = z.infer<typeof schema>;

export function onPage(mount: Mount, path: string, entry: CollectionEntry<'articles'>) {
  mount(path, ArticleComponent, {
    schema: {},
  });
}

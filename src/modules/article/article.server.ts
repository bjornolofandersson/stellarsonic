import { Mount } from "@lib/interfaces";
import { CollectionEntry, z } from "astro:content";
import ArticleComponent from './article.astro';

export const name = 'Article';
export const icon = 'draft';
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

/*
@module({
  name: 'Article',
  icon: 'draft'
})
@content({
  collection: 'articles',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
  })
})
export default class ArticleContent extends PageContent {
  get component() {
    return ArticleComponent;
  }

  get jsonld() {
    
  }

  get preview() {
    const { title, description, image} = this.entity.data;

    return { title, description, image };
  }
}
*/

import { z, CollectionEntry } from "astro:content";
import Page from './page.astro';

export const collection = 'pages';
export const schema = {
  title: z.string(),
}

export async function getStaticPaths(entry: CollectionEntry<'pages'>) {
  return {
    params: { path: entry.slug },
    props: { title: entry.data.title, Module: Page, props: {entry} },
  }
}

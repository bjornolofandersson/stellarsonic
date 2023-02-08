import Container from "./container.astro";
import { z, CollectionEntry } from "astro:content";
import Page from './page.astro';

export const collection = 'pages';
export const schema = {
  title: z.string().optional(),
  parent: z.string().optional(),
  context: z.string().optional(),
  content: z.object({
    collection: z.string(),
    id: z.string(),
    type: z.string(),
  }).optional()
}

export async function getStaticPaths(entry: CollectionEntry<'pages'>) {
  const {data} = entry;

  const Module = data.content ? Container : Page;

  return {
    params: { path: data.slug || entry.slug },
    props: { title: entry.data.title, Module, props: {entry} },
  }
}

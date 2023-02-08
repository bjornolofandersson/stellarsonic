import { z, CollectionEntry } from "astro:content";

import Container from './container.astro';

export const collection = 'containers';
export const schema = {
  collection: z.string(),
  entry: z.string(),
  type: z.string(),
}

export async function getStaticPaths(entry: CollectionEntry<'containers'>) {
  return {
    params: { path: entry.slug },
    props: { title: '', Module: Container, props: {entry} },
  }
}

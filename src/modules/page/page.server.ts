import { CollectionEntry } from "astro:content";
import Page from './page.astro';

export async function getStaticPaths(entry: CollectionEntry<'pages'>) {
  return {
    params: { path: entry.slug },
    props: { title: entry.data.title, Module: Page, props: {entry} },
  }
}
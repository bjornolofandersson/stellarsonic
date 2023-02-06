import { CollectionEntry } from "astro:content";
import Container from './container.astro';

export async function getStaticPaths(entry: CollectionEntry<'containers'>) {
  return {
    params: { path: entry.slug },
    props: { title: '', Module: Container, props: {entry} },
  }
}

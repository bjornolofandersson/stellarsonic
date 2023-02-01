import { SitePage } from "@lib/interfaces";
import { getCollection } from "astro:content";
import Playlist from './playlist.astro';

export async function getStaticPaths({path, collection}: SitePage & any) {
  const entries = await getCollection(collection as any);
  let paths: any[] = [];
  
  for (let entry of entries) {
    paths.push({
      params: { path: path.replace('{slug}', entry.slug)},
      props: {
        title: entry.data.title,
        Module: Playlist,
        props: {entry, collection}
      }
    });
  }

  return paths;
}

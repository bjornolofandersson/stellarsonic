import { SitePage } from "@lib/interfaces";
import { z, getCollection } from "astro:content";
import Playlist from './playlist.astro';

export const schema = {
  title: z.string(),
  subtitle: z.string().optional(),
  description: z.string(),
  date: z.date(),
  image: z.string(),
  colors: z.array(z.string()),
  genres: z.array(z.string()),
  tags: z.array(z.string()),
  audio: z.string(),
  tracks: z.array(z.object({
    name: z.string(),
    artist: z.string(),
    year: z.number().optional(),
    duration: z.string(),
  })),
}

export async function getStaticPaths({path, collection, parent}: SitePage & any) {
  const entries = await getCollection(collection as any);
  let paths: any[] = [];
  
  for (let entry of entries) {
    paths.push({
      params: { path: path.replace('{slug}', entry.slug)},
      props: {
        title: entry.data.title,
        Module: Playlist,
        props: {entry, collection, parentUrl: `/${parent}`}
      }
    });
  }

  return paths;
}

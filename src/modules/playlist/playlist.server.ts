import { CollectionController } from "@lib/CollectionController";
import { SitePage } from "@lib/interfaces";
import { z, getCollection, CollectionEntry } from "astro:content";
import Playlist from './playlist.astro';
import site from '@settings';

export const collection = 'mixes';
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

export const Component = Playlist;

export const jsonld = (entry: CollectionEntry<'mixes'>) => {
  const {title, subtitle, date, image, description, tracks, genres, tags} = entry.data;

  return {
    "@context": "https://schema.org",
    "@type": "MusicPlaylist",
    headline: title,
    alternativeHeadline: subtitle,
    datePublished: `${date}`,
    image: {
      "@type": "ImageObject",
      url: `${site.url}${image}`,
    },
    description: `${description}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${site.url}/mixes/`,
    },
    track: tracks.map(({name, artist, year, duration}) => ({
      "@type": "MusicRecording",
      name,
      byArtist: artist,
      copyrightYear: year,
      duration,
    })),
    genre: genres,
    keywords: tags.join(', '),
  }
}

export const editorProps = (entry: CollectionEntry<'mixes'>) => {
  const col = new CollectionController(entry.collection);
  return {
    entity: CollectionController.makeEntity(entry),
    assets: col.getAssetPaths(entry.slug),
  };
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

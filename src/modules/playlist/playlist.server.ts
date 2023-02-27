import { CollectionController } from "@lib/CollectionController";
import { z, CollectionEntry } from "astro:content";
import Playlist from './playlist.astro';
import site from '@settings';
import { Mount } from "@lib/interfaces";

export const collection = 'mixes';
export const schema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  description: z.string(),
  date: z.date(),
  image: z.string(),
  genres: z.array(z.string()),
  tags: z.array(z.string()),
  audio: z.string(),
  tracks: z.array(z.object({
    name: z.string(),
    artist: z.string(),
    year: z.number().optional(),
    duration: z.string(),
  })),
});

export type MusicMix = z.infer<typeof schema>;

export function onPage(mount: Mount, path: string, entry: CollectionEntry<'mixes'>) {
  const {title, subtitle, date, image, description, tracks, genres, tags} = entry.data;
  const col = new CollectionController(entry.collection);

  mount(path, Playlist, {
    schema: {
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
    },
    editor: {
      entity: CollectionController.makeEntity(entry),
      assets: col.getAssetPaths(entry.slug),
    },
  });
}

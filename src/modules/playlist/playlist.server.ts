import { z, CollectionEntry } from "astro:content";
import Playlist from './playlist.astro';
import site from '@settings';
import { Mount } from "@lib/interfaces";


export const name = 'Playlist';
export const icon = 'queue_music';
export const collection = 'mixes';

const trackSchema = z.object({
  name: z.string(),
  artist: z.string(),
  year: z.number().optional(),
  duration: z.string(),
});

export const schema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  description: z.string(),
  date: z.date(),
  image: z.string(),
  genres: z.array(z.string()),
  tags: z.array(z.string()),
  audio: z.string(),
  tracks: z.array(trackSchema),
});

export type MusicMix = z.infer<typeof schema>;
export type MusicMixTrack = z.infer<typeof trackSchema>;

export function onPage(mount: Mount, path: string, entry: CollectionEntry<'mixes'>) {
  const {title, subtitle, date, image, description, tracks, genres, tags} = entry.data;

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
  });
}

import { CollectionController } from "@lib/CollectionController";
import { z, CollectionEntry } from "astro:content";
import Index from './index.astro';
import { Mount } from "@lib/interfaces";

export const collection = 'indices';
export const schema = z.object({
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
});

export function onPage(mount: Mount, path: string, entry: CollectionEntry<'indices'>) {
  const {title, sections} = entry.data;
  const col = new CollectionController(entry.collection);

  mount(path, Index, {
    schema: {},
    editor: {
      entity: CollectionController.makeEntity(entry),
      assets: col.getAssetPaths(entry.slug),
    },
  });
}

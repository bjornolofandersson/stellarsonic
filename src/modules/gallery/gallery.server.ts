import { z, CollectionEntry } from "astro:content";
import Gallery from './gallery.astro';
import { Mount } from "@lib/interfaces";

export const collection = 'galleries';
export const schema = z.object({
  title: z.string(),
  cta: z.array(z.object({
    label: z.string(),
    url: z.string(),
  })),
  include: z.string(),
});

export type Gallery = z.infer<typeof schema>;

export function onPage(mount: Mount, path: string, entry: CollectionEntry<'galleries'>) {
  mount(path, Gallery, {
    schema: {} 
  });
}

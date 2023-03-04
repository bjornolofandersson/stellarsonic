import { CollectionController } from "@lib/CollectionController";
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
  gallery: z.object({
    disabled: z.boolean().optional(),
    title: z.string(),
    blog: z.string(),
  }),
});

export function onPage(mount: Mount, path: string, entry: CollectionEntry<'galleries'>) {
  const col = new CollectionController(entry.collection);

  mount(path, Gallery, {
    schema: {},
    editor: {
      entity: CollectionController.makeEntity(entry),
      assets: col.getAssetPaths(entry.slug),
    },
  });
}

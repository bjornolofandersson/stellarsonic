import Container from "./container.astro";
import { z, CollectionEntry, getEntry } from "astro:content";
import Page from './page.astro';
import { Entity } from "@lib/interfaces";
import { CollectionController } from "@lib/CollectionController";

export const collection = 'pages';
export const schema = {
  title: z.string().optional(),
  parent: z.string().optional(),
  context: z.string(),
  draft: z.boolean().optional(),
  content: z.object({
    collection: z.string(),
    id: z.string(),
    type: z.string(),
  }).optional(),
  palette: z.array(z.string()).optional(),
}

async function getTemplate(name: string): Promise<Entity<any>> {
  try {
    const entry = await getEntry('templates', `${name}.md` as any);
    return CollectionController.makeEntity(entry);
  } catch (err) {
    return {
      id: name,
      slug: name,
      data: {
        fontSize: {
          h1: 6, h2: 5, h3: 4, h4: 3, h5: 2, h6: 2, p: 1
        },
        textAlign: 'left',
      },
    }
  }
}

export async function getStaticPaths(entry: CollectionEntry<'pages'>) {
  const {data} = entry;

  const Module = data.content ? Container : Page;
  const template = await getTemplate(entry.data.context);

  return {
    params: { path: data.slug || entry.slug },
    props: { title: entry.data.title, Module, props: {entry, template} },
  }
}

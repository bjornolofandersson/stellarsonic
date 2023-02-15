import { CollectionController } from "@lib/CollectionController";
import { Mount } from "@lib/interfaces";
import { Page } from "astro";
import { z, CollectionEntry, getCollection, getEntryBySlug } from "astro:content";
import BlogPage from './blog.astro';

export const collection = 'blogs';
export const schema = z.object({
  title: z.string(),
  limit: z.number(),
  pagination: z.boolean(),
  theme: z.object({
    layout: z.string(),
  }),
});

export async function onPage(mount: Mount, path: string, entry: CollectionEntry<'blogs'>) {
  const {limit, title, pagination} = entry.data;
  const isDev = import.meta.env.MODE === 'development';

  const postPageEntries = await getCollection('pages', p => {
    return (p.data.parent === entry.slug && p.data.context === 'blog-post') && (isDev || !p.data.draft);
  });

  let posts: any[] = [];
  for (let p of postPageEntries) {
    const e = await getEntryBySlug(p.data.content.collection, p.data.content.id);
    posts.push({...e, slug: p.slug});
  }

  const sortedEntries = posts.sort((a, b) => {
    //return b.data.date.localeCompare(a.data.date);
    return 1;
  });
  let pageCount = Math.ceil(posts.length / limit);

  function getPage(i: number): Page {
    const start = i * limit;
    const end = Math.min(((i + 1) * limit), posts.length);

    return {
      start,
      end,
      total: posts.length,
      currentPage: i + 1,
      size: end - start,
      lastPage: pageCount,
      data: posts.slice(start, end),
      url: {
        current: entry.slug,
        next: '',
        prev: '',
      }
    }
  }

  function getPath(page: number) {
    return {
      params: { path: page > 0 ? `${entry.slug}/${page + 1}` : entry.slug },
      props: { title, Module: BlogPage, props: {entry, page: getPage(page), posts} },
    }
  }

  mount(path, BlogPage, {
    schema: {},
    editor: {
      entity: CollectionController.makeEntity(entry),
      posts,
    },
    props: {
      pagination: getPage(0),
    }
  });
}

import { Page } from "astro";
import { z, CollectionEntry, getCollection, getEntry } from "astro:content";
import BlogPage from './blog.astro';

export const collection = 'blogs';
export const schema = {
  title: z.string(),
  limit: z.number(),
  pagination: z.boolean(),
  posts: z.object({
    path: z.string(),
    type: z.string(),
    collection: z.string(),
  }),
}

export async function getStaticPaths(entry: CollectionEntry<'blogs'>) {
  const {limit, title, pagination} = entry.data;

  const postPageEntries = await getCollection('pages', p => {
    return p.data.parent === entry.slug && p.data.context === 'blog-post';
  });

  let posts: any[] = [];
  for (let p of postPageEntries) {
    const e = await getEntry(p.data.content.collection, p.data.content.id);
    posts.push({...e, slug: p.data.slug});
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

  let paths: any[] = [getPath(0)];

  if (pagination) {
    for (let i=1; i<pageCount; i++) {
      paths.push(getPath(i));
    }
  }
  return paths;
}

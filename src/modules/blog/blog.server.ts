import { Page } from "astro";
import { CollectionEntry, getCollection } from "astro:content";
import BlogPage from './blog.astro';

export async function getStaticPaths(entry: CollectionEntry<'blogs'>) {
  const {posts, limit, title, pagination} = entry.data;

  const entries = await getCollection(posts.collection as any);
  const sortedEntries = entries.sort((a, b) => {
    //return b.data.date.localeCompare(a.data.date);
    return 1;
  });
  let pageCount = Math.ceil(entries.length / limit);

  function getPage(i: number): Page {
    const start = i * limit;
    const end = Math.min(((i + 1) * limit), entries.length);

    return {
      start,
      end,
      total: entries.length,
      currentPage: i + 1,
      size: end - start,
      lastPage: pageCount,
      data: entries.slice(start, end),
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
      props: { title, Module: BlogPage, props: {entry, page: getPage(page)} },
    }
  }

  let paths: any[] = [getPath(0)];

  if (pagination) {
    for (let i=1; i<pageCount; i++) {
      paths.push(getPath(i));
    }
  }

  const modules = import.meta.glob('../*/*.server.ts', {eager: true});
  const module = modules[`../${posts.type}/${posts.type}.server.ts`] as any;

  return [...paths, ...(await module.getStaticPaths({...posts, parent: entry.slug}))];
}
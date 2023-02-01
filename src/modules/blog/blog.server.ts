import { SitePage } from "@lib/interfaces";
import { Page } from "astro";
import { getCollection } from "astro:content";
import BlogPage from './BlogPage.astro';

export interface BlogPost {
  path: string;

  collection: string;

  type: string;
}

export interface Blog {
  title: string;

  path: string;

  posts: BlogPost;

  limit: number;

  pagination: boolean;
}

export async function getStaticPaths({path, title, posts, limit, pagination}: Blog & SitePage) {
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
        current: path,
        next: '',
        prev: '',
      }
    }
  }

  function getPath(page: number) {
    return {
      params: { path: page > 0 ? `${path}/${page + 1}` : path },
      props: { title, Module: BlogPage, props: {path, posts, limit, pagination, page: getPage(page)} },
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

  return [...paths, ...(await module.getStaticPaths(posts))];
}
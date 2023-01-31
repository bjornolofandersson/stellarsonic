import { SitePage } from "@modules/interfaces";
import { Page } from "astro";
import { getCollection } from "astro:content";
import BlogPage from './BlogPage.astro';
import PlaylistPage from '../playlist/Playlist.astro';

export interface Blog {
  title: string;

  path: string;

  collection: string;

  limit: number;

  pagination: boolean;
}

export async function getBlogStaticPaths({path, title, collection, limit, pagination}: Blog & SitePage) {
  const entries = await getCollection(collection as any);
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
      props: { title, Module: BlogPage, props: {path, collection, limit, pagination, page: getPage(page)} },
    }
  }

  let paths: any[] = [getPath(0)];

  if (pagination) {
    for (let i=1; i<pageCount; i++) {
      paths.push(getPath(i));
    }
  }

  for (let entry of entries) {
    paths.push({
      params: { path: `${path}/${entry.slug}`},
      props: {
        title: entry.data.title,
        Module: PlaylistPage,
        props: {entry, collection: 'mixes'}
      }
    });
  }

  return paths;
}
import GalleryPage from '@modules/gallery/GalleryPage.astro';
import { Page } from 'astro';
import { getCollection } from 'astro:content';
import { Gallery } from './gallery/Gallery';
import { SitePage } from './interfaces';

export function getModuleStaticPaths(page: SitePage) {
  switch(page.type) {
    case 'gallery': return getGalleryStaticPaths(page as any);
    default:
      throw new Error(`Unknown module type: ${page.type}`);
  }
}

export async function getGalleryStaticPaths({path, title, collection, limit, pagination}: Gallery & SitePage) {
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
      props: { title, Module: GalleryPage, props: {path, limit, pagination, page: getPage(page)} },
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

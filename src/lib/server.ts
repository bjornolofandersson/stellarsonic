import { getCollection } from "astro:content";
import site from '@settings';

export function blogCollectionPaths(collection: string, pageSize: number) {
  return async ({ paginate }: any) => {
    const posts = await getCollection(collection as any);
    const sortedPosts = posts.sort((a, b) => {
        //return b.data.date.localeCompare(a.data.date);
        return 1;
    });

    return paginate(sortedPosts, { pageSize });
  }
}

export async function getSitemap() {
  const blogs = await getCollection('blogs');

  return {...site, pages: blogs.map(b => ({title: b.data.title, path: b.data.path, type: 'blog'}))};
}

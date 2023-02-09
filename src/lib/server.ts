import { getCollection } from "astro:content";
import site from '@settings';
import { ServerModule } from "./interfaces";

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
  const pages = await getCollection('pages');

  return {
    ...site,
    pages: [
      ...blogs.map(b => ({title: b.data.title, path: b.slug, type: 'blog'})),
      ...pages
        .filter(p => p.data.parent === undefined)
        .map(p => ({title: p.data.title, path: p.slug, type: p.data.content ? p.data.content.type : 'page'})),
    ]};
}

export function getServerModules() {
  const modules = import.meta.glob('../modules/*/*.server.ts', {eager: true, });
  const result: Record<string, ServerModule> = {};
  for (const path in modules) {
    const name = path.substring(path.lastIndexOf('/') + 1).replace('.server.ts', '');
    result[name] = modules[path] as ServerModule;
  }
  return result;
}

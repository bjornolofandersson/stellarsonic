import { getCollection } from "astro:content";
import site from '@settings';
import { ServerModule } from "./interfaces";

export async function getSitemap() {
  const pages = await getCollection('pages');

  return {
    ...site,
    pages: [
      ...pages
        .filter(p => p.data.parent === undefined)
        .map(p => ({title: p.data.title, path: p.slug, type: p.data.type})),
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

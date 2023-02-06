import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { EntryRouter } from '@lib/EntryRouter';
import { CollectionController } from '@lib/CollectionController';

const router = new EntryRouter(new CollectionController('blogs'));

export async function getStaticPaths() {
  const docs = await getCollection('blogs');
  return docs.map(entry => ({
    params: { slug: entry.slug },
  }));
}

export const get: APIRoute = async ctx => router.get(ctx);
export const put: APIRoute = async ctx => router.put(ctx);
export const del: APIRoute = async ctx => router.del(ctx);

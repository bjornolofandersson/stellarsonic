import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { PostRouter } from '@lib/PostRouter';
import { PostController } from '@lib/PostController';

const router = new PostRouter(new PostController('mixes'));

export async function getStaticPaths() {
  const docs = await getCollection('mixes');
  return docs.map(entry => ({
    params: { slug: entry.slug },
  }));
}

export const get: APIRoute = async ctx => router.get(ctx);
export const put: APIRoute = async ctx => router.put(ctx);
export const del: APIRoute = async ctx => router.del(ctx);

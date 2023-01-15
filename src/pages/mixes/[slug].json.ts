import type { APIRoute } from 'astro';
import { PostRouter } from '@lib/server';

const router = new PostRouter('mixes');

export async function getStaticPaths() {
  return router.getStaticPaths();
}

export const get: APIRoute = async ctx => router.get(ctx);
export const put: APIRoute = async ctx => router.put(ctx);
export const del: APIRoute = async ctx => router.del(ctx);

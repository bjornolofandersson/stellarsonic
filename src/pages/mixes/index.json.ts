import type { APIRoute } from 'astro';
import { CollectionRouter } from '@lib/CollectionRouter';
import { CollectionController } from '@lib/CollectionController';

const router = new CollectionRouter(new CollectionController('mixes'));

export const post: APIRoute = ctx => router.post(ctx);
export const get: APIRoute = ctx => router.get(ctx);

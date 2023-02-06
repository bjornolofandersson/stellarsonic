import type { APIRoute } from 'astro';
import { CollectionRouter } from '@lib/CollectionRouter';
import { CollectionController } from '@lib/CollectionController';

const router = new CollectionRouter(new CollectionController('blogs'));

export const post: APIRoute = ctx => router.post(ctx);

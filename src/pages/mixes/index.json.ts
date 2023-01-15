import type { APIRoute } from 'astro';
import { PostCollectionRouter } from '@lib/PostCollectionRouter';
import { PostController } from '@lib/PostController';

const router = new PostCollectionRouter(new PostController('mixes'));

export const post: APIRoute = ctx => router.post(ctx);

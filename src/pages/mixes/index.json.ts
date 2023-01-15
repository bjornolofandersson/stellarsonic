import type { APIRoute } from 'astro';
import { PostCollectionRouter } from '@lib/server';

const router = new PostCollectionRouter('mixes');

export const post: APIRoute = ctx => router.post(ctx);

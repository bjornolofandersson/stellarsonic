import { defineCollection } from 'astro:content';
import * as container from '@modules/container/container.server';
import * as page from '@modules/page/page.server';
import * as blog from '@modules/blog/blog.server';
import * as playlist from '@modules/playlist/playlist.server';

export const collections = {
  pages: defineCollection({schema: page.schema}),
  containers: defineCollection({schema: container.schema}),
  blogs: defineCollection({schema: blog.schema}),
  mixes: defineCollection({schema: playlist.schema}),
};

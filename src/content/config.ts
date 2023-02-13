import { defineCollection, z } from 'astro:content';
import * as page from '@modules/page/page.server';
import * as blog from '@modules/blog/blog.server';
import * as playlist from '@modules/playlist/playlist.server';

export const collections = {
  pages: defineCollection({schema: page.schema}),
  blogs: defineCollection({schema: blog.schema}),
  mixes: defineCollection({schema: playlist.schema}),
  /*
  palettes: defineCollection({schema: {
    colors: z.array(z.string()),
  }}),
  */
};

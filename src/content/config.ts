import { defineCollection, z } from 'astro:content';
import * as page from '@modules/page/page.server';
import * as blog from '@modules/blog/blog.server';
import * as playlist from '@modules/playlist/playlist.server';

export const collections = {
  pages: defineCollection({schema: page.schema}),
  blogs: defineCollection({schema: blog.schema}),
  mixes: defineCollection({schema: playlist.schema}),
  templates: defineCollection({schema: {
    fontSize: z.object({
      h1: z.number(),
      h2: z.number(),
      h3: z.number(),
      h4: z.number(),
      h5: z.number(),
      h6: z.number(),
      p: z.number(),
    }),
    textAlign: z.string(),
  }}),
};

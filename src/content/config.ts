import { defineCollection, z } from 'astro:content';
import * as page from '@modules/page/page.server';
import * as blog from '@modules/blog/blog.server';
import * as playlist from '@modules/playlist/playlist.server';

export const collections = {
  pages: defineCollection({schema: page.schema}),
  blogs: defineCollection({schema: blog.schema}),
  mixes: defineCollection({schema: playlist.schema}),
  templates: defineCollection({schema: z.object({
    fontSize: z.object({
      h1: z.number(),
      h2: z.number(),
      h3: z.number(),
      h4: z.number(),
      h5: z.number(),
      h6: z.number(),
      p: z.number(),
      button: z.number(),
    }),
    fontFamily: z.object({
      h1: z.string(),
      p: z.string(),
      button: z.string(),
    }),
    fontWeight: z.object({
      h1: z.number(),
      p: z.number(),
      button: z.number(),
    }),
    textAlign: z.string(),
  })}),
  indices: defineCollection({schema: z.object({
    title: z.string(),
    hero: z.object({
      disabled: z.boolean().optional(),
      title: z.string(),
      description: z.string(),
      cta: z.object({
        label: z.string(),
        url: z.string(),
      }),
    }),
    gallery: z.object({
      disabled: z.boolean().optional(),
      title: z.string(),
      blog: z.string(),
    }),
  })})
};

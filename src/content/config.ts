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
    }),
    textAlign: z.string(),
  })}),
  indices: defineCollection({schema: z.object({
    title: z.string(),
    sections: z.array(z.discriminatedUnion("type", [
      z.object({
        type: z.literal("hero"),
        title: z.string(),
        description: z.string(),
        cta: z.object({
          label: z.string(),
          url: z.string(),
        }),
      }),
    ])),
  })})
};

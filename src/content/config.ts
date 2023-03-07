import { defineCollection, z } from 'astro:content';
import * as blog from '@modules/blog/blog.server';
import * as gallery from '@modules/gallery/gallery.server';
import * as playlist from '@modules/playlist/playlist.server';

export const pageSchema = z.object({
  //title: z.string().optional(),
  parent: z.string().optional(),
  context: z.string(),
  draft: z.boolean().optional(),
  content: z.object({
    collection: z.string(),
    id: z.string(),
  }),
  palette: z.array(z.string()),
  tags: z.array(z.string()).optional(),
});

const colorPair = z.tuple([z.number(), z.number()]);

const colorComposition = z.object({
  background: colorPair,
  text: colorPair,
});

export const templateSchema = z.object({
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
  colorGroups: z.tuple([
    colorComposition,
    colorComposition,
    colorComposition
  ]),
  colors: z.object({
    background: z.object({
      primary: z.number(),
      secondary: z.number(),
      tertiary: z.number(),
      article: z.number(),
    }),
    text: z.object({
      active: z.number(),
      h1: z.number(),
      h2: z.number(),
      p: z.number(),
      a: z.number(),
    }),
    textArticle: z.object({
      h1: z.number(),
      h2: z.number(),
      p: z.number(),
      a: z.number(),
    }),
  }),
});

export type Page = z.infer<typeof pageSchema>;
export type Template = z.infer<typeof templateSchema>;

export const collections = {
  pages: defineCollection({schema: pageSchema}),
  templates: defineCollection({schema: templateSchema}),

  blogs: defineCollection({schema: blog.schema}),
  mixes: defineCollection({schema: playlist.schema}),
  galleries: defineCollection({schema: gallery.schema}),
};

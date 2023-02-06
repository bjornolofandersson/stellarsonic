import { z, defineCollection } from 'astro:content';

const pageSchema = {
  title: z.string(),
  type: z.string(),
}

const blogSchema = {
  title: z.string(),
  limit: z.number(),
  pagination: z.boolean(),
  posts: z.object({
    path: z.string(),
    type: z.string(),
    collection: z.string(),
  }),
}

const mixSchema = {
  title: z.string(),
  subtitle: z.string().optional(),
  description: z.string(),
  date: z.date(),
  image: z.string(),
  colors: z.array(z.string()),
  genres: z.array(z.string()),
  tags: z.array(z.string()),
  audio: z.string(),
  tracks: z.array(z.object({
    name: z.string(),
    artist: z.string(),
    year: z.number().optional(),
    duration: z.string(),
  })),
}

const pages = defineCollection({
  schema: pageSchema,
});

const blogs = defineCollection({
  schema: blogSchema,
});

const mixes = defineCollection({
  schema: mixSchema,
});

export const collections = {
  pages: pages,
  blogs: blogs,
  mixes: mixes,
};

import { z, defineCollection } from 'astro:content';

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

const mixes = defineCollection({
  schema: mixSchema,
});

export const collections = {
  mixes: mixes,
};

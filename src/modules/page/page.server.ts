import { z } from "astro:content";

export const collection = 'pages';
export const schema = {
  title: z.string().optional(),
  parent: z.string().optional(),
  context: z.string(),
  draft: z.boolean().optional(),
  content: z.object({
    collection: z.string(),
    id: z.string(),
  }).optional(),
  palette: z.array(z.string()).optional(),
  menu: z.string(),
}

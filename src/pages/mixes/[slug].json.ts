import type { APIRoute } from 'astro';
import { getCollection, getEntry } from 'astro:content';
import * as yaml from 'yaml';
import * as fs from 'fs';

export async function getStaticPaths() {
  const docs = await getCollection('mixes');
  return docs.map(entry => ({
    params: { slug: entry.slug },
  }));
}

export function slugToPath(slug: string) {
  return `/src/content/mixes/${slug}.md`;
}

export const get: APIRoute = async ({ params }) => {
  const slug = params.slug;
  const entry = await getEntry('mixes', `${slug}.md` as any);
  return {
    body: JSON.stringify(entry.data)
  }
};

export const put: APIRoute = async ({ params, request }) => {
  const entry = await getEntry('mixes', `${params.slug}.md` as any);
  const payload = await request.json();

  const result = {...entry.data, ...payload};
  const frontmatter = yaml.stringify(result);
  const output = '---\n' + frontmatter + '---\n' + entry.body;

  try {
    fs.writeFileSync(slugToPath(params.slug), output);
    // file written successfully
  } catch (err) {
    console.error(err);
  }

  return {
    body: JSON.stringify(result)
  }
};

export const del: APIRoute = async ({ params }) => {
  const path = slugToPath(params.slug as string);

  await fs.rmSync(path);

  return {
    body: JSON.stringify({
      message: "This was a DELETE!"
    })
  }
}

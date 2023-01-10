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

export const get: APIRoute = async ({ params, request }) => {
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
    fs.writeFileSync(`src/content/mixes/${params.slug}.md`, output);
    // file written successfully
  } catch (err) {
    console.error(err);
  }

  return {
    body: JSON.stringify(result)
  }
};

import type { APIRoute } from 'astro';
import { getCollection, getEntry } from 'astro:content';

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

export const post: APIRoute = ({ request }) => {
  console.log('got post request');
  return {
    body: JSON.stringify({
      message: "This was a POST!"
    })
  }
};

import type { APIRoute } from 'astro';
import * as yaml from 'yaml';
import * as fs from 'fs';
import slugify from 'slugify';

export const post: APIRoute = async ({ request }) => {
  const payload = await request.json();

  const frontmatter = yaml.stringify(payload);
  const output = '---\n' + frontmatter + '---\n';
  const slug = slugify(payload.title, {lower: true});

  try {
    fs.writeFileSync(`src/content/mixes/${slug}.md`, output);
    // file written successfully
  } catch (err) {
    console.error(err);
  }

  return {
    body: JSON.stringify({data: payload, slug})
  }
};

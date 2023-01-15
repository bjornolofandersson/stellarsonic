import { APIRoute } from "astro";
import { getCollection, getEntry } from "astro:content";
import * as yaml from 'yaml';
import * as fs from 'fs';
import slugify from 'slugify';

export function blogCollectionPaths(collection: string, pageSize: number) {
  return async ({ paginate }: any) => {
    const posts = await getCollection(collection as any);
    const sortedPosts = posts.sort((a, b) => {
        //return b.data.date.localeCompare(a.data.date);
        return 1;
    });

    return paginate(sortedPosts, { pageSize });
  }
}

export async function collectionSlugs(collection: string): Promise<string[]> {
  const posts = await getCollection(collection as any);
  return posts.map(p => p.slug);
}

export class PostRouter {
  public constructor(private collection: string) {}

  public async getStaticPaths() {
    const docs = await getCollection(this.collection as any);
    return docs.map(entry => ({
      params: { slug: entry.slug },
    }));
  }

  private slugToPath(slug: string) {
    return `src/content/${this.collection}/${slug}.md`;
  }

  public get: APIRoute = async ({ params }) => {
    const slug = params.slug;
    const entry = await getEntry(this.collection as any, `${slug}.md` as any);
    return {
      body: JSON.stringify(entry.data)
    }
  };

  public put: APIRoute = async ({ params, request }) => {
    const entry = await getEntry(this.collection as any, `${params.slug}.md` as any);
    const payload = await request.json();

    const result = {...entry.data, ...payload};
    const frontmatter = yaml.stringify(result);
    const output = '---\n' + frontmatter + '---\n' + entry.body;

    try {
      fs.writeFileSync(this.slugToPath(params.slug as string), output);
      // file written successfully
    } catch (err) {
      console.error(err);
    }

    return {
      body: JSON.stringify(result)
    }
  };

  public del: APIRoute = async ({ params }) => {
    const path = this.slugToPath(params.slug as string);

    await fs.rmSync(path);

    return {
      body: JSON.stringify({
        message: "This was a DELETE!"
      })
    }
  }
}


export class PostCollectionRouter {
  public constructor(private collection: string) {}

  /**
   * Route for creating a new post
   */
  public post: APIRoute = async ({ request }) => {
    const payload = await request.json();

    const frontmatter = yaml.stringify(payload);
    const output = '---\n' + frontmatter + '---\n';
    const slug = slugify(payload.title, {lower: true});

    try {
      fs.writeFileSync(`src/content/${this.collection}/${slug}.md`, output);
      // file written successfully
    } catch (err) {
      console.error(err);
    }

    return {
      body: JSON.stringify({data: payload, slug})
    }
  };
}

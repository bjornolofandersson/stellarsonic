import { CollectionEntry, getCollection, getEntry } from "astro:content";
import * as yaml from 'yaml';
import * as fs from 'fs';
import slugify from 'slugify';

export class CollectionController<T extends {title: string} = {title: string}> {
  public constructor(public readonly collection: string) {}

  /**
   * Create a new post
   * 
   * @param body 
   * @returns The post slug
   */
  public create(body: T) {
    const slug = slugify(body.title, {lower: true});
    this.write(slug, body);
    return slug;
  }

  public write(slug: string, body: T) {
    const frontmatter = yaml.stringify(body);
    const output = '---\n' + frontmatter + '---\n';

    fs.writeFileSync(this.slugToPath(slug), output);
  }

  public remove(slug: string) {
    fs.rmSync(this.slugToPath(slug));
  }

  public async getBySlug(slug: string): Promise<CollectionEntry<any>> {
    return getEntry(this.collection as any, `${slug}.md` as any);
  }

  public getAllEntries(): Promise<CollectionEntry<any>> {
    return getCollection(this.collection as any);
  }

  public getAssetPaths(slug: string) {
    try {
      return fs.readdirSync(`public/assets/${this.collection}/${slug}`)
        .map(file => `/assets/${this.collection}/${slug}/${file}`);
    } catch (err) {
      return [];
    }
  }

  private slugToPath(slug: string) {
    return `src/content/${this.collection}/${slug}.md`;
  }
}

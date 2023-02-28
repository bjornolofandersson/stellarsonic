import { CollectionEntry, getCollection, getEntryBySlug } from "astro:content";
import * as yaml from 'yaml';
import * as fs from 'fs';
import slugify from 'slugify';
import { Entity } from "./interfaces";

export class CollectionController<T extends {title: string}> {
  public constructor(public readonly collection: string) {}

  /**
   * Create a new post
   * 
   * @param body 
   * @returns The post slug
   */
  public create(entry: Entity<T>) {
    const slug = entry.slug ? entry.slug : slugify(entry.data.title, {lower: true});
    this.write({...entry, slug});
    return slug;
  }

  public write(entity: Entity<T>) {
    const frontmatter = yaml.stringify({...entity.data, slug: entity.slug});
    const output = '---\n' + frontmatter + '---\n' + (entity.body ? entity.body : '');

    fs.writeFileSync(this.filePath(entity.id), output);
  }

  public remove(id: string) {
    fs.rmSync(this.filePath(id));
  }

  public async getById(id: string): Promise<Entity<T>> {
    const matching = await getCollection(this.collection as any, entry => entry.id === `${id}.md`);
    //const entry = await getEntryBySlug(this.collection as any, slug);
    return CollectionController.makeEntity(matching[0]);
  }

  public async getAllEntities(): Promise<Entity<any>[]> {
    const entries = await getCollection(this.collection as any);
    return entries.map(e => CollectionController.makeEntity(e));
  }

  public getAssetPaths(slug: string) {
    try {
      return fs.readdirSync(`public/assets/${this.collection}/${slug}`)
        .map(file => `/assets/${this.collection}/${slug}/${file}`);
    } catch (err) {
      return [];
    }
  }

  private filePath(id: string) {
    return `src/content/${this.collection}/${id}.md`;
  }

  public static makeEntity<T = any>(entry: CollectionEntry<any>): Entity<T> {
    return {
      id: entry.id.replace(/\.[^/.]+$/, ""),
      slug: entry.slug,
      collection: entry.collection,
      data: entry.data,
      body: entry.body,
    }
  }
}


import { Entity, Mount, PageSummary, ServerModule } from '@lib/interfaces';
import { CollectionEntry, getEntryBySlug } from 'astro:content';
import { CollectionController } from '@lib/CollectionController';
import { getServerModules } from './server';
import { Palette } from 'src/content/config';

async function getTemplate(name: string): Promise<Entity<any>> {
  try {
    const entry = await getEntryBySlug('templates', name);
    return CollectionController.makeEntity(entry);
  } catch (err) {
    throw err;
    return {
      id: name,
      slug: name,
      collection: 'templates',
      data: {
        fontSize: {
          h1: 6, h2: 5, h3: 4, h4: 3, h5: 2, h6: 2, p: 1
        },
        textAlign: 'left',
      },
    }
  }
}

async function getPalette(name: string): Promise<Entity<Palette>> {
  const entry = await getEntryBySlug('palettes', name);
  return CollectionController.makeEntity(entry);
}

export async function getPagePaths(page: CollectionEntry<'pages'>, modules: Record<string, ServerModule>) {
  const paths: any[] = [];
  const template = await getTemplate(page.data.context);
  const palette = await getPalette(page.data.palette);
  const moduleName = page.data.type;
  const collection = modules[moduleName].collection;

  const entry = await getEntryBySlug(collection as any, page.data.reference);
  const col = new CollectionController(entry.collection);

  const mount: Mount = (path, Component, config) => {
    paths.push({
      params: {path},
      props: {
        Component,
        entry,
        title: entry.data.title, //|| page.data.title,
        module: moduleName,
        page: CollectionController.makeEntity(page),
        template,
        palette,
        editor: {
          entity: CollectionController.makeEntity(entry),
          assets: col.getAssetPaths(entry.slug),
          ...config.editor,
        },
        props: config.props,
        schema: config.schema,
      }
    });
  }

  const m = modules[moduleName];
  await m.onPage(mount, page.slug, entry);

  return paths;
}

export async function getPagePreview(page: CollectionEntry<'pages'>): Promise<PageSummary> {
  const entry = await getPageContent(page);

  return {
    slug: page.slug,
    title: entry.data.title,
    description: entry.data.description,
    image: entry.data.image,
  };
}

export async function getPageContent(page: CollectionEntry<'pages'>) {
  const modules = await getServerModules();
  const collection = modules[page.data.type].collection;

  return getEntryBySlug(collection as any, page.data.reference);
}

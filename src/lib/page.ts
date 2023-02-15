
import { Entity, Mount, ServerModule } from '@lib/interfaces';
import { CollectionEntry, getEntryBySlug } from 'astro:content';
import { CollectionController } from '@lib/CollectionController';
import PageComponent from '@modules/page/page.astro';

async function getTemplate(name: string): Promise<Entity<any>> {
  try {
    const entry = await getEntryBySlug('templates', name as any);
    return CollectionController.makeEntity(entry);
  } catch (err) {
    return {
      id: name,
      slug: name,
      data: {
        fontSize: {
          h1: 6, h2: 5, h3: 4, h4: 3, h5: 2, h6: 2, p: 1
        },
        textAlign: 'left',
      },
    }
  }
}

export async function getPagePaths(page: CollectionEntry<'pages'>, modules: Record<string, ServerModule>) {
  const paths: any[] = [];
  const content = page.data.content;
  const template = await getTemplate(page.data.context);

  if (content) {
    const entry = await getEntryBySlug(content.collection as any, content.id);

    let moduleName: string = '';
    for (let name of Object.keys(modules)) {
      if (modules[name].collection === content.collection) {
        moduleName = name;
      }
    }

    const mount: Mount = (path, Component, config) => {
      paths.push({
        params: {path},
        props: {
          Component,
          entry,
          title: entry.data.title || page.data.title,
          module: moduleName,
          page: CollectionController.makeEntity(page),
          template,
          ...config,
        }
      });
    }

    const m = modules[moduleName];
    await m.onPage(mount, page.slug, entry);
  } else {
    paths.push({
      params: {path: page.slug},
      props: {
        Component: PageComponent,
        entry: page,
        title: page.data.title,
        page: CollectionController.makeEntity(page),
        template,
      }
    });
  }

  return paths;
}
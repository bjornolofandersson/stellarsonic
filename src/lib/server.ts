import { getCollection } from "astro:content";
import site from '@settings';
import { ServerModule } from "./interfaces";
import { CollectionController } from "./CollectionController";
import { APIRoute } from "astro";

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

export async function getSitemap() {
  const pages = await getCollection('pages');

  return {
    ...site,
    pages: [
      ...pages
        .filter(p => p.data.parent === undefined)
        .map(p => ({title: p.data.title, path: p.slug, type: p.data.content ? p.data.content.type : 'page'})),
    ]};
}

export function getServerModules() {
  const modules = import.meta.glob('../modules/*/*.server.ts', {eager: true, });
  const result: Record<string, ServerModule> = {};
  for (const path in modules) {
    const name = path.substring(path.lastIndexOf('/') + 1).replace('.server.ts', '');
    result[name] = modules[path] as ServerModule;
  }
  return result;
}


export function collectionRouter(collection: string) {
  const ctrl = new CollectionController(collection);

  const post: APIRoute = async ({ request }) => {
    const payload = await request.json();

    const slug = ctrl.create(payload);
    return {
      body: JSON.stringify({data: payload, slug})
    }
  };

  const get: APIRoute = async () => {
    const entries = await ctrl.getAllEntities();
    return {
      body: JSON.stringify(entries)
    }
  }

  return { post, get };
}


export function entryRouter(collection: string) {
  const ctrl = new CollectionController(collection);

  const get: APIRoute = async ({ params }) => {
    const entry = await ctrl.getById(params.id as string);
    const {id, slug, data, body} = entry;
    return {
      body: JSON.stringify({id, slug, data, body})
    }
  };

  const put: APIRoute = async ({ params, request }) => {
    const payload = await request.json();

    ctrl.write(payload);

    return {
      body: JSON.stringify(payload)
    }
  };

  const del: APIRoute = async ({ params }) => {
    ctrl.remove(params.slug as string);

    return {
      body: JSON.stringify({
        message: "This was a DELETE!"
      })
    }
  }

  return {
    getStaticPaths: async () => {
      const entities = await ctrl.getAllEntities();
      return entities.map(e => ({
        params: { id: e.id },
      }));
    },
    get,
    put,
    del,
  }
}

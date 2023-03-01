import { APIRoute } from "astro"
import { CollectionController } from "@lib/CollectionController";
import { getCollection } from "astro:content";

export async function getStaticPaths() {
  const collections = ['blogs', 'mixes', 'pages', 'templates'];
  const paths: any[] = [];

  for (let c of collections) {
    const entries = await getCollection(c as any);
    for (let e of entries) {
      paths.push({
        path: `${c}/${e.slug}.json`,
        params: {
          collection: c,
          id: e.id.replace(/\.[^/.]+$/, "")
        }
      });
    }
  }

  return paths;
}

export const get: APIRoute = async ({ params }) => {
  const ctrl = new CollectionController(params.collection as string);

  return {
    body: JSON.stringify(await ctrl.getById(params.id as string))
  }
}

export const put: APIRoute = async ({ params, request }) => {
  const ctrl = new CollectionController(params.collection as string);
  const payload = await request.json();

  ctrl.write(payload);

  return {
    body: JSON.stringify(payload)
  }
}

export const del: APIRoute = async ({ params }) => {
  const ctrl = new CollectionController(params.collection as string);
  ctrl.remove(params.id as string);

  return {
    body: JSON.stringify({
      message: "This was a DELETE!"
    })
  }
}

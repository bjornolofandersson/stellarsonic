import { APIRoute } from "astro"
import { CollectionController } from "@lib/CollectionController";

export async function getStaticPaths() {
  const collections = ['blogs', 'mixes', 'galleries', 'pages', 'templates'];
  const paths: any[] = [];

  for (let c of collections) {
    paths.push({ path: `${c}.json`, params: { collection: c }});
  }
  return paths;
}

export const get: APIRoute = async ({ params }) => {
  if (!params.collection) {
    throw Error("");
  }
  const ctrl = new CollectionController(params.collection);
  return {
    body: JSON.stringify(await ctrl.getAllEntities())
  }
}

export const post: APIRoute = async ({ params, request }) => {
  const ctrl = new CollectionController(params.collection as string);
  const payload = await request.json();

  const slug = ctrl.create(payload);
  return {
    body: JSON.stringify({data: payload, slug})
  }
};

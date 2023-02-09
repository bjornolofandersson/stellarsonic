import { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { CollectionController } from "./CollectionController";

export class CollectionRouter {
  public constructor(private controller: CollectionController) {}

  /**
   * Route for creating a new post
   */
  public post: APIRoute = async ({ request }) => {
    const payload = await request.json();

    const slug = this.controller.create(payload);
    return {
      body: JSON.stringify({data: payload, slug})
    }
  };

  public get: APIRoute = async () => {
    const entries = await this.controller.getAllEntries();
    return {
      body: JSON.stringify(entries)
    }
  }
}

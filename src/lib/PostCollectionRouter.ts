import { APIRoute } from "astro";
import { PostController } from "./PostController";

export class PostCollectionRouter {
  public constructor(private controller: PostController) {}

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
}

import { APIRoute } from "astro";
import { PostController } from "./PostController";

export class PostRouter {
  public constructor(private controller: PostController) {}

  public get: APIRoute = async ({ params }) => {
    const entry = await this.controller.getBySlug(params.slug as string);
    return {
      body: JSON.stringify(entry.data)
    }
  };

  public put: APIRoute = async ({ params, request }) => {
    const entry = await this.controller.getBySlug(params.slug as string);
    const payload = await request.json();

    const result = {...entry.data, ...payload};
    this.controller.write(params.slug as string, result);

    return {
      body: JSON.stringify(result)
    }
  };

  public del: APIRoute = async ({ params }) => {
    this.controller.remove(params.slug as string);

    return {
      body: JSON.stringify({
        message: "This was a DELETE!"
      })
    }
  }
}
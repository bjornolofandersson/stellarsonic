export function savePost(collection: string, slug: string, post: any) {
  fetch(`/${collection}/${slug}.json`, {
    method: 'PUT',
    body: JSON.stringify(post),
  });
}

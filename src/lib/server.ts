import { getCollection } from "astro:content";

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

export async function collectionSlugs(collection: string): Promise<string[]> {
  const posts = await getCollection(collection as any);
  return posts.map(p => p.slug);
}

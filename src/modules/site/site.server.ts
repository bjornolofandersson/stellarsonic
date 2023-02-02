import { SitePage } from "@lib/interfaces";

export interface Site {
  title: string;

  pages: SitePage[];
}

export async function getStaticPaths({title, pages}: Site) {
  return [];
}

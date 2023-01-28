import { getBlogStaticPaths } from './blog/Blog';
import { SitePage } from './interfaces';

export function getModuleStaticPaths(page: SitePage) {
  switch(page.type) {
    case 'blog': return getBlogStaticPaths(page as any);
    default:
      throw new Error(`Unknown module type: ${page.type}`);
  }
}

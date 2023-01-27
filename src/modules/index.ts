import Gallery from '@modules/gallery/GalleryPage.astro';

export function getModule(type: string) {
  switch(type) {
    case 'gallery': return Gallery;
    default:
      throw new Error(`Unknown module type: ${type}`);
  }
}

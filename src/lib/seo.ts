import { MusicMixPost } from './interfaces';
import site from "@settings";

export function musicMixSchema(post: MusicMixPost) {
  const {title, subtitle, date, image, description, tracks, genres, tags} = post;

  return {
    "@context": "https://schema.org",
    "@type": "MusicPlaylist",
    headline: title,
    alternativeHeadline: subtitle,
    datePublished: `${date}`,
    image: {
      "@type": "ImageObject",
      url: `${site.url}${image}`,
    },
    description: `${description}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${site.url}/mixes/`,
    },
    track: tracks.map(({name, artist, year, duration}) => ({
      "@type": "MusicRecording",
      name,
      byArtist: artist,
      copyrightYear: year,
      duration,
    })),
    genre: genres,
    keywords: tags.join(', '),
  }
}

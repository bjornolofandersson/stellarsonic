import { MusicMixTrack } from "@lib/interfaces";
import { writable } from "svelte/store";

export const title = writable('');
export const subtitle = writable('');
export const description = writable('');
export const audio = writable('');
export const tracks = writable<MusicMixTrack[]>([]);
export const colorPrimary = writable('');
export const colorSecondary = writable('');

export function initialize(post: any) {
  title.set(post.title);
  subtitle.set(post.subtitle);
  description.set(post.description.trim());
  tracks.set(post.tracks);
  audio.set(post.audio);
  colorPrimary.set(post.colors[0]);
  colorSecondary.set(post.colors[1]);
}

import { MusicMixPostPost } from "@lib/interfaces";
import { writable } from "svelte/store";

export const post = writable<MusicMixPost>({
  title: '',
  image: '',
  date: new Date().toISOString(),
  audio: '',
  description: '',
  tracks: [],
  genres: [],
  tags: [],
  colors: [],
});

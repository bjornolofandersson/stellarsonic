import { MusicMix } from "@lib/interfaces";
import { writable } from "svelte/store";

export const slug = writable('');

export const post = writable<MusicMix>({
  title: '',
  image: '',
  date: '',
  audio: '',
  description: '',
  tracks: [],
  genres: [],
  tags: [],
  colors: [],
});

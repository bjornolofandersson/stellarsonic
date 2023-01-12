import { writable } from "svelte/store";

export const settings = writable<any>({
  title: '',
  url: '',
  description: '',
});

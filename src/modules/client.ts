import BlogEditor from "./blog/BlogEditor.svelte";

export interface EditorConfig {
  module: string;
}

export function createEditor(module: string) {
  switch (module) {
    case 'blog': return BlogEditor;
    default: throw new Error('');
  }
}

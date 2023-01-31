<script lang="ts">
  import BlogEditor from "./blog/BlogEditor.svelte";
  import PlaylistEditor from "./playlist/PlaylistEditor.svelte";

  export let module: string;
  export let props: any;

  function createEditor() {
    switch (module) {
        case 'blog': return BlogEditor;
        case 'playlist': return PlaylistEditor;
        default: throw new Error('');
    }
  }

  const Editor = createEditor();
</script>

<svelte:component this={Editor} {...props}>
  <slot/>
</svelte:component>

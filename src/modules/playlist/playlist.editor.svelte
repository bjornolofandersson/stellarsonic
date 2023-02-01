<script lang="ts">
  import Editor from '@components/editor/common/Editor.svelte';
  import MainPanel from '@components/editor/common/MainPanel.svelte';

  export let collection: string;
  export let data: any;
</script>

<Editor pageTitle={"Hello"} onSave={() => {}}>
  <MainPanel>
    Playlist editor
  </MainPanel>
  <div slot="preview"><slot/></div>
</Editor>

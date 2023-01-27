<script lang="ts">
  import Editor from '@components/editor/common/Editor.svelte';
  import MainPanel from '@components/editor/common/MainPanel.svelte';
  import TextInput from '@components/editor/common/TextInput.svelte';

  export let collection: string;
  export let title: string;
</script>

<Editor pageTitle={title} onSave={() => {}}>
  <MainPanel>
    Gallery editor

    <TextInput label="Page title" bind:value={title}></TextInput>
  </MainPanel>

  <div slot="preview"><slot/></div>
</Editor>

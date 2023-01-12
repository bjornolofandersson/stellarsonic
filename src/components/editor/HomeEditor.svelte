<script lang="ts">
  import Editor from './Editor.svelte';

  function onSave() {}
</script>

<Editor pageTitle="Home" onSave={onSave}>

  <div slot="preview"><slot/></div>
</Editor>

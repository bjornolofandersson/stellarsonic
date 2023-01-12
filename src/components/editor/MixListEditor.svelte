<script lang="ts">
  import Editor from './Editor.svelte';

  function onSave() {
  }

  let selected: any = undefined;
</script>

<Editor pageTitle="mixes" onSave={onSave}>
  {#if !selected}
    <button>Create mix</button>
  {/if}

  <div slot="preview"><slot/></div>
</Editor>

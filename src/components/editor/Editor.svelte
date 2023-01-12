<script lang="ts">
  import PageContainer from "./PageContainer.svelte";

  export let pageTitle: string;
  export let onSave: () => void;
</script>

<div class="bg-stone-300 fixed w-screen h-screen">
  <div class="w-[512px] absolute mt-12 text-stone-700 font-editor">
    <slot/>
  </div>

  <PageContainer bind:title={pageTitle} onSave={onSave}>
    <slot name="preview"/>
  </PageContainer>
</div>

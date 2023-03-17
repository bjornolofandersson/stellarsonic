<script lang="ts" context="module">
  export const PANELS: any = {};
</script>

<script lang="ts">
  import PageContainer from "./PageContainer.svelte";

  export let pageTitle: string;
  export let onSave: () => void;
</script>

<div class="bg-stone-200 fixed w-screen h-screen">
  <div class="w-[420px] h-full absolute text-stone-700 font-editor">
    <slot name="sidebar"/>
  </div>

  <PageContainer bind:title={pageTitle} onSave={onSave}>
    <slot name="preview"/>
  </PageContainer>
</div>

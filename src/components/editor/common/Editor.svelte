<script lang="ts">
  import { fade } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import PageContainer from "./PageContainer.svelte";

  export let pageTitle: string;
  export let onSave: () => void;
  export let showPreview: boolean = true;
</script>

<div class="bg-stone-300 fixed w-screen h-screen">
  <div class="w-[512px] absolute mt-12 text-stone-700 font-editor">
    <slot/>
  </div>

  {#if showPreview}
    <div transition:fade={{ duration: 500, easing: quintOut }}>
      <PageContainer bind:title={pageTitle} onSave={onSave}>
        <slot name="preview"/>
      </PageContainer>
    </div>
  {/if}
</div>

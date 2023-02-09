<script lang="ts">
  export let page: any;
</script>

<div class="bg-white container mx-auto min-h-full">
  <div class="page-content px-8" style={`
    --theme-font-size-h1: ${page.style.fontSize.h1}rem;
    --theme-font-size-h2: ${page.style.fontSize.h2}rem;
    --theme-font-size-h3: ${page.style.fontSize.h3}rem;
    --theme-font-size-p: ${page.style.fontSize.p}rem;
    --theme-text-color-h1: ${page.style.color.h1};
    --theme-text-color-h2: ${page.style.color.h2};
    --theme-text-color-h3: ${page.style.color.h3};
    --theme-text-color-p: ${page.style.color.p};
  `}>
    <slot/>
  </div>
</div>

<style>
  .page-content :global(h1) {
    font-size: var(--theme-font-size-h1);
    color: var(--theme-text-color-h1);
  }
  .page-content :global(h2) {
    font-size: var(--theme-font-size-h2);
    color: var(--theme-text-color-h2);
  }
  .page-content :global(h3) {
    font-size: var(--theme-font-size-h3);
    color: var(--theme-text-color-h3);
  }
  .page-content :global(p) {
    font-size: var(--theme-font-size-p);
    color: var(--theme-text-color-p);
  }
</style>

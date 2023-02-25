<script lang="ts">
  import type { Entity } from "@lib/interfaces";
  import { PageStore, TemplateStore } from "@modules/page/page";

  export let template: Entity<any>;
  export let page: Entity<any>;

  const { entity: storedTemplate} = TemplateStore.instance(template);
  const { entity: storedPage } = PageStore.instance(page);
</script>

<main class="bg-slate-100 dark:bg-dark-base" style={`
  --theme-palette-1: ${$storedPage.data.palette[0]};
  --theme-palette-2: ${$storedPage.data.palette[1]};
  --theme-palette-3: ${$storedPage.data.palette[2]};
  --theme-palette-4: ${$storedPage.data.palette[3]};
  --theme-font-h1: ${$storedTemplate.data.fontFamily.h1};
  --theme-font-p: ${$storedTemplate.data.fontFamily.p};
  --theme-font-button: ${$storedTemplate.data.fontFamily.button};
  --theme-font-weight-h1: ${$storedTemplate.data.fontWeight.h1};
  --theme-font-weight-p: ${$storedTemplate.data.fontWeight.p};
  --theme-font-weight-button: ${$storedTemplate.data.fontWeight.button};
  --theme-font-size-h1: ${$storedTemplate.data.fontSize.h1}rem;
  --theme-font-size-p: ${$storedTemplate.data.fontSize.p}rem;
  --theme-font-size-button: ${$storedTemplate.data.fontSize.button}rem;
`}>
  <slot/>
</main>

<style global>
  main :global(.bg-palette-1) {
    background-color: var(--theme-palette-1);
  }
  main :global(.bg-palette-2) {
    background-color: var(--theme-palette-2);
  }
  main :global(.bg-palette-3) {
    background-color: var(--theme-palette-3);
  }
  main :global(.bg-palette-4) {
    background-color: var(--theme-palette-4);
  }
  main :global(.text-palette-1) {
    color: var(--theme-palette-1);
  }
  main :global(.text-palette-2) {
    color: var(--theme-palette-2);
  }
  main :global(.text-palette-3) {
    color: var(--theme-palette-3);
  }
  main :global(.text-palette-4) {
    color: var(--theme-palette-4);
  }
  main :global(.font-title) {
    font-family: var(--theme-font-h1);
    font-weight: var(--theme-font-weight-h1);
  }
  main :global(.font-primary) {
    font-family: var(--theme-font-p);
    font-weight: var(--theme-font-weight-p);
  }
  main :global(.site-title) {
    font-family: var(--theme-font-3);
  }
  main :global(h1) {
    font-size: var(--theme-font-size-h1);
  }
  main :global(p) {
    font-family: var(--theme-font-p);
    font-size: var(--theme-font-size-p);
    font-weight: var(--theme-font-weight-p);
  }
  main :global(button) {
    font-family: var(--theme-font-button);
    font-size: var(--theme-font-size-button);
    font-weight: var(--theme-font-weight-button);
  }
  main :global(a) {
    font-family: var(--theme-font-button);
    font-size: var(--theme-font-size-button);
    font-weight: var(--theme-font-weight-button);
  }
  main .article h1 {
    font-family: var(--theme-font-h1);
  }
  main .article p {
    padding: 20px 0;
    font-family: var(--theme-font-p);
  }
</style>

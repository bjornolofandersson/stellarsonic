<script lang="ts">
  import type { Entity } from "@lib/interfaces";
  import { loadEntity } from "@lib/store";
  import type { Palette, Template } from "src/content/config";

  export let template: Entity<Template>;
  export let palette: Entity<Palette>;

  const t = loadEntity(template);
  const p = loadEntity(palette);
</script>

<main class="bg-slate-100 dark:bg-dark-base" style={`
  --theme-bg-primary: ${$p.data.colors[$t.data.colorGroups[0].background[0]]};
  --theme-bg-accent: ${$p.data.colors[$t.data.colorGroups[0].background[1]]};
  --theme-text-primary: ${$p.data.colors[$t.data.colorGroups[0].text[0]]};
  --theme-text-accent: ${$p.data.colors[$t.data.colorGroups[0].text[1]]};
  --theme-article-bg-primary: ${$p.data.colors[$t.data.colorGroups[1].background[0]]};
  --theme-article-bg-accent: ${$p.data.colors[$t.data.colorGroups[1].background[1]]};
  --theme-article-text-primary: ${$p.data.colors[$t.data.colorGroups[1].text[0]]};
  --theme-article-text-accent: ${$p.data.colors[$t.data.colorGroups[1].text[1]]};
  --theme-font-h1: ${$t.data.fontFamily.h1};
  --theme-font-p: ${$t.data.fontFamily.p};
  --theme-font-button: ${$t.data.fontFamily.button};
  --theme-font-weight-h1: ${$t.data.fontWeight.h1};
  --theme-font-weight-p: ${$t.data.fontWeight.p};
  --theme-font-weight-button: ${$t.data.fontWeight.button};
  --theme-line-height-h1: ${$t.data.lineHeight.h1};
  --theme-line-height-p: ${$t.data.lineHeight.p};
  --theme-line-height-button: ${$t.data.lineHeight.button};
  --theme-font-size-h1: ${$t.data.fontSize.h1}rem;
  --theme-font-size-p: ${$t.data.fontSize.p}rem;
  --theme-font-size-button: ${$t.data.fontSize.button}rem;
  --theme-text-align: ${$t.data.textAlign};
`}>
  <slot/>
</main>

<style global>
  main :global(.font-title) {
    font-family: var(--theme-font-h1);
    font-weight: var(--theme-font-weight-h1);
    line-height: var(--theme-line-height-h1);
  }
  main :global(.font-primary) {
    font-family: var(--theme-font-p);
    font-weight: var(--theme-font-weight-p);
    line-height: var(--theme-line-height-p);
  }
  main :global(.site-title) {
    font-family: var(--theme-font-3);
  }
  main :global(h1) {
    font-size: var(--theme-font-size-h1);
    line-height: var(--theme-line-height-h1);
  }
  main :global(p) {
    font-family: var(--theme-font-p);
    font-size: var(--theme-font-size-p);
    font-weight: var(--theme-font-weight-p);
    line-height: var(--theme-line-height-p);
  }
  main :global(button) {
    font-family: var(--theme-font-button);
    font-size: var(--theme-font-size-button);
    font-weight: var(--theme-font-weight-button);
    line-height: var(--theme-line-height-button);
  }
  main :global(a) {
    font-family: var(--theme-font-button);
    font-size: var(--theme-font-size-button);
    font-weight: var(--theme-font-weight-button);
  }
  main :global(.article-body) {
    background-color: var(--theme-cg3-bg-primary);
    text-align: var(--theme-text-align);
  }
  main :global(.article-body h1) {
    font-family: var(--theme-font-h1);
  }
  main :global(.article-body p) {
    padding: 20px 0;
    font-family: var(--theme-font-p);
  }
</style>

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
  --theme-font-size-h1: ${$t.data.fontSize.h1}rem;
  --theme-font-size-p: ${$t.data.fontSize.p}rem;
  --theme-font-size-button: ${$t.data.fontSize.button}rem;
  --theme-text-align: ${$t.data.textAlign};
`}>
  <slot/>
</main>

<style global>
/*
  main :global(.layer-1 .bg-primary) {
    background-color: var(--theme-cg1-bg-primary);
  }
  main :global(.layer-1.bg-primary) {
    background-color: var(--theme-cg1-bg-primary);
  }
  main :global(.layer-1 .bg-accent) {
    background-color: var(--theme-cg1-bg-accent);
  }
  main :global(.layer-1.bg-accent) {
    background-color: var(--theme-cg1-bg-accent);
  }
  main :global(.layer-1 .text-primary) {
    color: var(--theme-cg1-text-primary);
  }
  main :global(.layer-1.text-primary) {
    color: var(--theme-cg1-text-primary);
  }
  main :global(.layer-1 .text-accent) {
    color: var(--theme-cg1-text-accent);
  }
  main :global(.layer-1.text-accent) {
    color: var(--theme-cg1-text-accent);
  }

  main :global(.layer-1-invert .bg-primary) {
    background-color: var(--theme-cg1-text-primary);
  }
  main :global(.layer-1-invert .bg-accent) {
    background-color: var(--theme-cg1-text-accent);
  }
  main :global(.layer-1-invert .text-primary) {
    color: var(--theme-cg1-bg-primary);
  }
  main :global(.layer-1-invert .text-accent) {
    color: var(--theme-cg1-bg-accent);
  }

  main :global(.layer-2 .bg-primary) {
    background-color: var(--theme-cg2-bg-primary);
  }
  main :global(.layer-2.bg-primary) {
    background-color: var(--theme-cg2-bg-primary);
  }
  main :global(.layer-2 .bg-accent) {
    background-color: var(--theme-cg2-bg-accent);
  }
  main :global(.layer-2.bg-accent) {
    background-color: var(--theme-cg2-bg-accent);
  }
  main :global(.layer-2 .text-primary) {
    color: var(--theme-cg2-text-primary);
  }
  main :global(.layer-2.text-primary) {
    color: var(--theme-cg2-text-primary);
  }
  main :global(.layer-2 .text-accent) {
    color: var(--theme-cg2-text-accent);
  }
  main :global(.layer-2.text-accent) {
    color: var(--theme-cg2-text-accent);
  }

  main :global(.article .bg-primary) {
    background-color: var(--theme-cg3-bg-primary);
  }
  main :global(.article.bg-primary) {
    background-color: var(--theme-cg3-bg-primary);
  }
  main :global(.article .bg-accent) {
    background-color: var(--theme-cg3-bg-accent);
  }
  main :global(.article.bg-accent) {
    background-color: var(--theme-cg3-bg-accent);
  }
  main :global(.article .text-primary) {
    color: var(--theme-cg3-text-primary);
  }
  main :global(.article.text-primary) {
    color: var(--theme-cg3-text-primary);
  }
  main :global(.article .text-accent) {
    color: var(--theme-cg3-text-accent);
  }
  main :global(.article.text-accent) {
    color: var(--theme-cg3-text-accent);
  }
  */
/*
  main :global(.bg-primary) {
    background-color: var(--theme-bg-primary);
  }
  main :global(.bg-secondary) {
    background-color: var(--theme-bg-secondary);
  }
  main :global(.bg-tertiary) {
    background-color: var(--theme-bg-tertiary);
  }
  main :global(.bg-article) {
    background-color: var(--theme-bg-article);
  }
  main :global(.text-h1) {
    color: var(--theme-text-h1);
  }
  main :global(.text-h2) {
    color: var(--theme-text-h2);
  }
  main :global(.text-p) {
    color: var(--theme-text-p);
  }
  main :global(.text-a) {
    color: var(--theme-text-a);
  }
  main :global(.text-active) {
    color: var(--theme-text-active);
  }
  main :global(.text-article-h1) {
    color: var(--theme-text-article-h1);
  }
  main :global(.text-article-h2) {
    color: var(--theme-text-article-h2);
  }
  main :global(.text-article-p) {
    color: var(--theme-text-article-p);
  }
  main :global(.text-article-a) {
    color: var(--theme-text-article-a);
  }

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
  */
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

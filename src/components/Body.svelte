<script lang="ts">
  import type { Entity } from "@lib/interfaces";
  import { TemplateStore } from "@modules/page/page";

  export let template: Entity<any>;

  const templateStore = TemplateStore.instance(template);
  let { entity: storedTemplate } = templateStore;

  $: {
    console.log($storedTemplate);
  }
</script>

<body class="bg-slate-100 dark:bg-dark-base" style={`
  --theme-font-h1: ${$storedTemplate.data.fontFamily.h1};
  --theme-font-p: ${$storedTemplate.data.fontFamily.p};
  --theme-font-weight-h1: ${$storedTemplate.data.fontWeight.h1};
  --theme-font-weight-p: ${$storedTemplate.data.fontWeight.p};
  --theme-font-size-h1: ${$storedTemplate.data.fontSize.h1}rem;
  --theme-font-size-p: ${$storedTemplate.data.fontSize.p}rem;
`}>
  <slot/>
</body>

<style global>
  body :global(.styled .font-title) {
    font-family: var(--theme-font-h1);
    font-weight: var(--theme-font-weight-h1);
  }
  body :global(.styled .font-primary) {
    font-family: var(--theme-font-p);
    font-weight: var(--theme-font-weight-p);
  }
  body :global(.styled .site-title) {
    font-family: var(--theme-font-3);
  }
  body :global(.styled h1) {
    font-size: var(--theme-font-size-h1);
  }

  .article h1 {
    font-family: var(--theme-font-h1);
  }
  .article p {
    padding: 20px 0;
    font-family: var(--theme-font-p);
  }
</style>

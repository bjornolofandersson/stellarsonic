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
`}>
  <slot/>
</body>

<style global>
  body :global(.font-title) {
    font-family: var(--theme-font-h1);
  }
  body :global(.font-primary) {
    font-family: var(--theme-font-p);
  }
  body :global(.site-title) {
    font-family: var(--theme-font-3);
  }

  .article h1 {
    font-family: var(--theme-font-h1);
  }
  .article p {
    padding: 20px 0;
    font-family: var(--theme-font-p);
  }
</style>

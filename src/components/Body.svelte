<script lang="ts">
  import type { Entity } from "@lib/interfaces";

  export let template: Entity<any>;

  const style=`
    --theme-font-h1: ${template.data.fontFamily.h1};
    --theme-font-p: ${template.data.fontFamily.p};
  `;
</script>

<body class="bg-slate-100 dark:bg-dark-base" style={style}>
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

<script lang="ts">
  import type { Entity } from "@lib/interfaces";
  import { TemplateStore } from "@modules/page/page";

  export let template: Entity<any>;

  let {entity} = TemplateStore.instance(template);
</script>

<div class="content" style={`
  --theme-font-size-h1: ${$entity.data.fontSize.h1}rem;
  --theme-font-size-h2: ${$entity.data.fontSize.h2}rem;
  --theme-font-size-h3: ${$entity.data.fontSize.h3}rem;
  --theme-font-size-p: ${$entity.data.fontSize.p}rem;
  --theme-text-align: ${$entity.data.textAlign};
`}>
  <slot/>
</div>

<style>
  .content :global(h1) {
    font-size: var(--theme-font-size-h1);
  }
  .content :global(h2) {
    font-size: var(--theme-font-size-h2);
  }
  .content :global(h3) {
    font-size: var(--theme-font-size-h3);
  }
  .content :global(p) {
    font-size: var(--theme-font-size-p);
  }
  .content {
    text-align: var(--theme-text-align);
  }
</style>

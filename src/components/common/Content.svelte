<script lang="ts">
  export let style: any;
  export let baseStyle: any;
</script>

<div class="content" style={`
  --theme-font-size-h1: ${baseStyle.fontSize.h1}rem;
  --theme-font-size-h2: ${style.fontSize.h2}rem;
  --theme-font-size-h3: ${style.fontSize.h3}rem;
  --theme-font-size-p: ${style.fontSize.p}rem;
  --theme-text-color-h1: ${style.color.h1};
  --theme-text-color-h2: ${style.color.h2};
  --theme-text-color-h3: ${style.color.h3};
  --theme-text-color-p: ${style.color.p};
  --theme-text-align: ${style.textAlign};
`}>
  <slot/>
</div>

<style>
  .content :global(h1) {
    font-size: var(--theme-font-size-h1);
    color: var(--theme-text-color-h1);
  }
  .content :global(h2) {
    font-size: var(--theme-font-size-h2);
    color: var(--theme-text-color-h2);
  }
  .content :global(h3) {
    font-size: var(--theme-font-size-h3);
    color: var(--theme-text-color-h3);
  }
  .content :global(p) {
    font-size: var(--theme-font-size-p);
    color: var(--theme-text-color-p);
  }
  .content {
    text-align: var(--theme-text-align);
  }
</style>

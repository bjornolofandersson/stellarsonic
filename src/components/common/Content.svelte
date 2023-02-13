<script lang="ts">
  export let style: any;
</script>

<div class="content" style={`
  --theme-font-size-h1: ${style.fontSize.h1}rem;
  --theme-font-size-h2: ${style.fontSize.h2}rem;
  --theme-font-size-h3: ${style.fontSize.h3}rem;
  --theme-font-size-p: ${style.fontSize.p}rem;
  --theme-text-align: ${style.textAlign};
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

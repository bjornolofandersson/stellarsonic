<script lang="ts">
  export let page: any;
</script>

<div class="page-wrapper" style={`
  --theme-palette-1: ${page.palette[0]};
  --theme-palette-2: ${page.palette[1]};
  --theme-palette-3: ${page.palette[2]};
  --theme-palette-4: ${page.palette[3]};
`}>
  <slot/>
</div>

<style>
  .page-wrapper :global(.bg-palette-1) {
    background-color: var(--theme-palette-1);
  }
  .page-wrapper :global(.bg-palette-2) {
    background-color: var(--theme-palette-2);
  }
  .page-wrapper :global(.bg-palette-3) {
    background-color: var(--theme-palette-3);
  }
  .page-wrapper :global(.bg-palette-4) {
    background-color: var(--theme-palette-4);
  }
  .page-wrapper :global(.text-palette-1) {
    color: var(--theme-palette-1);
  }
  .page-wrapper :global(.text-palette-2) {
    color: var(--theme-palette-2);
  }
  .page-wrapper :global(.text-palette-3) {
    color: var(--theme-palette-3);
  }
  .page-wrapper :global(.text-palette-4) {
    color: var(--theme-palette-4);
  }
</style>

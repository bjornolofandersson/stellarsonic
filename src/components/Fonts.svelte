<script lang="ts">
  import type { Font, Entity } from "@lib/interfaces";

  export let template: Entity<any>;

  const fonts: Font[] = [
    { family: template.data.fontFamily.h1, weight: 400 },
    { family: template.data.fontFamily.p, weight: 400 },
    { family: 'Dancing Script', weight: 400 },
  ]
</script>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
{#each fonts as font}
  <link href="https://fonts.googleapis.com/css2?family={font.family.replace(' ', '+')}:wght@{font.weight}" rel="stylesheet">
{/each}

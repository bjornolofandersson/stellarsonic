<script lang="ts">
  import type { Font, Entity } from "@lib/interfaces";
  import { loadEntity } from "@lib/store";
  import type { Template } from "src/content/config";

  export let template: Entity<Template>;

  const t = loadEntity(template);

  let fonts: Font[] = [];

  $: {
    fonts = [
      { family: $t.data.fontFamily.h1, weight: $t.data.fontWeight.h1 },
      { family: $t.data.fontFamily.p, weight: $t.data.fontWeight.p },
      { family: $t.data.fontFamily.button, weight: $t.data.fontWeight.button },
      { family: 'Dancing Script', weight: 400 },
    ];
  }

</script>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
{#each fonts as font}
  <link href="https://fonts.googleapis.com/css2?family={font.family.replace(' ', '+')}:wght@{font.weight}" rel="stylesheet">
{/each}

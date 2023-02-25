<script lang="ts">
  import type { Font, Entity } from "@lib/interfaces";
  import { TemplateStore } from "@modules/page/page";

  export let template: Entity<any>;

  const templateStore = TemplateStore.instance(template);
  let { entity: storedTemplate } = templateStore;

  let fonts: Font[] = [];

  $: {
    fonts = [
      { family: $storedTemplate.data.fontFamily.h1, weight: $storedTemplate.data.fontWeight.h1 },
      { family: $storedTemplate.data.fontFamily.p, weight: $storedTemplate.data.fontWeight.p },
      { family: $storedTemplate.data.fontFamily.button, weight: $storedTemplate.data.fontWeight.button },
      { family: 'Dancing Script', weight: 400 },
    ];
  }

</script>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
{#each fonts as font}
  <link href="https://fonts.googleapis.com/css2?family={font.family.replace(' ', '+')}:wght@{font.weight}" rel="stylesheet">
{/each}

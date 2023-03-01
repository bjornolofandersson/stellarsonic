<script lang="ts">
  import MenuBar from "./MenuBar.svelte";

  export let data: any;
  export let sitemap: any;
</script>

<div class="bg-white container mx-auto min-h-full">
  <div class="{data.menu} bg-palette-1">
    <MenuBar sitemap={sitemap} />

    <div class="text-center text-5xl py-20 text-palette-3">{data.title}</div>
  </div>
  <div class="page-content px-8">
    <slot/>
  </div>
</div>

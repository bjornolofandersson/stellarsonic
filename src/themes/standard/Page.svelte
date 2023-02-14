<script lang="ts">
  import MenuBar from "./MenuBar.svelte";

  export let data: any;
  export let sitemap: any;
</script>

<div class="bg-white container mx-auto min-h-full">
  <div class="{data.menu}" style="background-color: {data.palette[0]}">
    <MenuBar sitemap={sitemap} />

    <div class="text-center text-5xl py-20" style="color: {data.palette[2]}">{data.title}</div>
  </div>
  <div class="page-content px-8">
    <slot/>
  </div>
</div>
